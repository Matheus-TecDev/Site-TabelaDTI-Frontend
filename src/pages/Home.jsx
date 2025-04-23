import { useEffect, useState } from "react";
import { Table, Spin, Alert, Tag } from "antd";
import './Home.css';

const Home = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animate, setAnimate] = useState(false);

    const apiUrl = "https://arrais-backend.onrender.com"; // URL base sem a parte final '/aquisicoes'
    console.log("🔥 API URL:", apiUrl);

    useEffect(() => {
        // Função movida para dentro do useEffect
        const buscarDados = () => {
            fetch(`${apiUrl}/aquisicoes`) // Concatenando a rota /aquisicoes
                .then(res => {
                    if (!res.ok) throw new Error("Falha ao buscar dados");
                    return res.json();
                })
                .then(res => {
                    setDados(res);
                    setLoading(false);
                    setTimeout(() => setAnimate(true), 100);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        };

        buscarDados();
    }, [apiUrl]);

    // Renderiza o carregamento ou erro
    if (loading) {
        return <div className="loading-container"><Spin size="large" /></div>;
    }

    if (error) {
        return <div className="error-container"><Alert message="Erro" description={error} type="error" /></div>;
    }

    return (
        <div className="home-container">
            <div className="headerr-container"></div>
            <section className={`animated-section ${animate ? "show" : ""}`}>
                <h1 className="section-title">Tabela de Veículos</h1>
                <Table
                    className="tabela-responsiva"
                    dataSource={dados}
                    rowKey="NR_PLACA"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showQuickJumper: true,
                        size: "small"
                    }}
                    size="small"
                    components={{
                        body: {
                            row: (props) => <tr {...props} className="ant-table-row-striped" />
                        }
                    }}
                >
                    {/* 1. PLACA */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">PLACA</span><span className="short-title">PLC</span></span>} 
                        dataIndex="NR_PLACA" 
                        align="center"
                        render={(text) => <div className="compact-cell">{text ? text.replace(/-/g, '') : "—"}</div>}
                    />

                    {/* 2. MODELO */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">MODELO</span><span className="short-title">MOD</span></span>} 
                        dataIndex="NM_MODELO" 
                        render={(text) => (
                            <div className="modelo-single-line">
                                {text || "—"}
                            </div>
                        )} 
                    />

                    {/* 3. COR */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">COR</span><span className="short-title">COR</span></span>} 
                        dataIndex="NM_COR" 
                        align="center"
                        render={(text) => <div className="compact-cell">{text ? text.substring(0, 3) : "—"}</div>}
                    />

                    {/* 4. ANO */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">ANO</span><span className="short-title">ANO</span></span>} 
                        dataIndex="NM_ANO" 
                        align="center"
                        render={(text) => <div className="compact-cell">{text ? "'"+text.toString().slice(-2) : "—"}</div>}
                    />

                    {/* 5. VALOR */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">VALOR</span><span className="short-title">VL</span></span>} 
                        dataIndex="VL_PEDIDO" 
                        align="center" 
                        render={(text) => text ? 
                            new Intl.NumberFormat('pt-BR', { 
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0 
                            }).format(text) 
                            : "—"
                        } 
                    />

                    {/* 6. COMBUSTÍVEL */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">COMBUSTÍVEL</span><span className="short-title">COMB</span></span>} 
                        dataIndex="TP_COMBUSTIVEL" 
                        align="center" 
                        render={(tipo) => {
                            const tipos = ["GAS", "ALC", "DIE", "FLE", "HIB", "ELE"];
                            return <div className="compact-cell">{tipos[tipo-1] || tipo}</div>;
                        }} 
                    />

                    {/* 7. SITUAÇÃO */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">SITUAÇÃO</span><span className="short-title">SIT</span></span>} 
                        dataIndex="TP_SITUACAO" 
                        align="center" 
                        render={(situacao) => {
                            const situacoes = {
                                1: { texto: "ES", cor: "green" },
                                7: { texto: "PD", cor: "gold" },
                                8: { texto: "FN", cor: "red" }
                            };
                            const status = situacoes[situacao] || { texto: situacao, cor: "blue" };
                            return <Tag color={status.cor} style={{margin: 0, padding: '0 2px', fontSize: '0.5rem'}}>{status.texto}</Tag>;
                        }} 
                    />

                    {/* 8. BLINDAGEM */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">BLINDAGEM</span><span className="short-title">BLD</span></span>} 
                        dataIndex="TP_BLINDADO" 
                        align="center" 
                        render={(blindado) => <div className="compact-cell">{blindado === 1 ? "S" : "N"}</div>} 
                    />

                    {/* 9. TRANSAÇÃO */}
                    <Table.Column 
                        title={<span className="title-container"><span className="full-title">TRANSAÇÃO</span><span className="short-title">TRAN</span></span>} 
                        dataIndex="NM_TRANSACAO" 
                        align="center" 
                        render={(text) => {
                            if (!text) return "—";
                            return <div className="compact-cell">{text === "Aquisicao" ? "AQ" : "CN"}</div>;
                        }} 
                    />
                </Table>
            </section>
        </div>
    );
};

export default Home;