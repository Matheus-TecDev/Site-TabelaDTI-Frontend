import { Button } from "antd";
import { useContext } from "react";
import { LoginContex } from "../contexts/LoginContext";
import "./Header.css";
import Logo from "../components/Logo_DTI.jpg";

const Header = () => {
    const { usuario, setUsuario } = useContext(LoginContex);

    return (
        <header className="header-container">
            <img src={Logo} alt="Logo DTI" className="header-logo" />
            
            <div className="user-actions">
                {usuario ? (
                    <div className="user-info">
                        <span className="user-name">{usuario.NM_USUARIO}</span>
                        <button className="logout-btn" onClick={() => {
                            setUsuario(null);
                            sessionStorage.removeItem("usuario");
                        }}>
                            Sair
                        </button>
                    </div>
                ) : (
                    <Button type="primary" className="login-btn" href="/login">
                        Detalhes/Extrato
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;