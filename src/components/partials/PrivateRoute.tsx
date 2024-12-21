// src/components/PrivateRoute.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { SpinLoading } from './Loading';

type Props = {
    children: React.ReactNode;
}

const PrivateRoute = ({ children}: Props) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        if (!token) {
            // Redireciona para a página de login caso não tenha token
            router.push('/login');
        }
    }, [token, router]); // O efeito será disparado quando o token mudar

    // Se não houver token, redireciona para o login
    if (!token) {
        return <SpinLoading/>; // Ou um loader até o redirecionamento acontecer
    }

    return <>{children}</>;
};

export default PrivateRoute;