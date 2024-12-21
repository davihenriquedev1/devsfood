import PrivateRoute from "@/components/partials/PrivateRoute";

const Page = () => {
    return (
        <PrivateRoute>
            <div>
                <h1>Orders</h1>
                <p>Here are all the orders.</p>
            </div>
        </PrivateRoute>
    );
};

export default Page;