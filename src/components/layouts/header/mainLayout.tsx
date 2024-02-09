import {Header} from "./header.tsx";


type MainLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};