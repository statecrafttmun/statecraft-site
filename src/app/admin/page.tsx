export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-gray-400 mb-2">Total Events</h3>
                    <p className="text-4xl font-bold text-primary">3</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-gray-400 mb-2">Blog Posts</h3>
                    <p className="text-4xl font-bold text-primary">4</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-gray-400 mb-2">Gallery Images</h3>
                    <p className="text-4xl font-bold text-primary">6</p>
                </div>
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-bold mb-4">Welcome to the Admin Panel</h2>
                <p className="text-gray-400">
                    Select a category from the sidebar to manage content. Changes made here will be reflected on the live website immediately.
                </p>
            </div>
        </div>
    );
}
