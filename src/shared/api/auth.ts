interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    data: {
        access_token: string;
        token_type: string;
        expires_in: number;
    }
}

export const loginAdmin = async(
    payload: LoginRequest
    ): Promise<LoginResponse> => {
        const response = await fetch(
            "/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                            },
                    body: JSON.stringify(payload),
                }
        );
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));

            throw new Error(
                error.error ??
                "Неверный логин или пароль"
            );
            }
        return response.json();
    }