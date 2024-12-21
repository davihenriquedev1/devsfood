import PrivateRoute from '@/components/partials/PrivateRoute';

const Page = () => {
    return (
        <PrivateRoute>
            <div>
                <h1>Profile</h1>
                <p>Welcome to your private profile!</p>
            </div>
        </PrivateRoute>
    );
};

export default Page;