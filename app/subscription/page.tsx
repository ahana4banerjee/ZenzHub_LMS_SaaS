import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
    return (
        <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 md:p-12">
            <PricingTable />
        </main>
    )
}
export default Subscription
