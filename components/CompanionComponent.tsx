'use client';

import { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col h-[75vh] gap-6">
            <section className="flex gap-6 max-sm:flex-col h-full">
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className="relative size-40 flex items-center justify-center rounded-3xl shadow-2xl transition-all duration-700"
                            style={{
                                backgroundColor: callStatus === CallStatus.ACTIVE ? getSubjectColor(subject) : 'rgb(39 39 42)',
                                boxShadow: callStatus === CallStatus.ACTIVE ? `0 0 40px ${getSubjectColor(subject)}40` : 'none'
                            }}>
                            <div
                                className={
                                    cn(
                                        'absolute transition-opacity duration-1000 flex items-center justify-center inset-0', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-50 animate-pulse'
                                    )
                                }>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={80} height={80} className="max-sm:w-16 opacity-90 invert-0" />
                            </div>

                            <div className={cn('absolute inset-0 flex items-center justify-center transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                                <Lottie
                                    lottieRef={lottieRef}
                                    animationData={soundwaves}
                                    autoplay={false}
                                    className="w-full h-full p-4"
                                />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-bold text-2xl text-white tracking-tight">{name}</p>
                            <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">{callStatus === CallStatus.ACTIVE ? 'Session Active' : callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Ready to Start'}</p>
                        </div>
                    </div>
                    {/* Background Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/50 z-0 pointer-events-none" />
                </div>

                <div className="w-full md:w-[380px] flex flex-col gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="size-12 relative">
                            <Image src={userImage} alt={userName} fill className="rounded-lg object-cover" />
                        </div>
                        <div>
                            <p className="font-semibold text-zinc-200">
                                {userName}
                            </p>
                            <p className="text-xs text-zinc-500">Student</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 overflow-hidden flex flex-col">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Transcript</div>
                        <div className="flex-1 overflow-y-auto space-y-4 px-2 no-scrollbar mask-image-b">
                            {messages.length === 0 && (
                                <p className="text-zinc-600 text-sm italic text-center mt-10">
                                    Start the session to begin the conversation...
                                </p>
                            )}
                            {messages.map((message, index) => {
                                if (message.role === 'assistant') {
                                    return (
                                        <div key={index} className="flex flex-col gap-1 items-start">
                                            <span className="text-[10px] uppercase text-zinc-500 font-bold ml-1">{name.split(' ')[0]}</span>
                                            <p className="text-zinc-300 text-sm bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none leading-relaxed">
                                                {message.content}
                                            </p>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className="flex flex-col gap-1 items-end">
                                            <p className="text-zinc-100 text-sm bg-zinc-700/50 border border-zinc-700 p-3 rounded-2xl rounded-tr-none leading-relaxed">
                                                {message.content}
                                            </p>
                                        </div>
                                    )
                                }
                            })}
                            <div className="h-4" />
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                        <button
                            className={cn('col-span-1 flex items-center justify-center rounded-xl transition-all border disabled:opacity-50 disabled:cursor-not-allowed', isMuted ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white')}
                            onClick={toggleMicrophone}
                            disabled={callStatus !== CallStatus.ACTIVE}
                        >
                            <Image
                                src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                                alt="mic"
                                width={20}
                                height={20}
                                className={isMuted ? 'opacity-100' : 'opacity-80'}
                            />
                        </button>

                        <button
                            className={cn('col-span-4 rounded-xl py-3 cursor-pointer transition-all font-semibold flex items-center justify-center gap-2 text-sm shadow-md',
                                callStatus === CallStatus.ACTIVE
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20'
                                    : 'bg-zinc-100 text-zinc-950 hover:bg-white',
                                callStatus === CallStatus.CONNECTING && 'opacity-80 cursor-wait'
                            )}
                            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                        >
                            {callStatus === CallStatus.ACTIVE && <span className="size-2 rounded-full bg-red-500 animate-pulse" />}
                            {callStatus === CallStatus.ACTIVE
                                ? "End Session"
                                : callStatus === CallStatus.CONNECTING
                                    ? 'Connecting...'
                                    : 'Start Session'
                            }
                        </button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default CompanionComponent
