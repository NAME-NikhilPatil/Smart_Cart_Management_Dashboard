const NotificationsPanel = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="absolute top-16 right-8 w-80 bg-white rounded-lg shadow-xl border z-10">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <ul className="p-2 max-h-80 overflow-y-auto">
                <li className="p-2 hover:bg-gray-50 rounded-md">
                    <p className="text-sm font-semibold">Assistance Requested</p>
                    <p className="text-xs text-gray-500">Cart-033 in Aisle 7 - 2 mins ago</p>
                </li>
                <li className="p-2 hover:bg-gray-50 rounded-md">
                    <p className="text-sm font-semibold">Cart-007 has low battery</p>
                    <p className="text-xs text-gray-500">Battery at 18% - 5 mins ago</p>
                </li>
                 <li className="p-2 hover:bg-gray-50 rounded-md">
                    <p className="text-sm font-semibold text-gray-400">System update complete</p>
                    <p className="text-xs text-gray-400">Yesterday</p>
                </li>
            </ul>
        </div>
    );
};

export default NotificationsPanel;