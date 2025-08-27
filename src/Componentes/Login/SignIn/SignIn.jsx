import React from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./SignIn.module.css";

function SignIn() {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        idUsuario: "",
        nome: "",
        email: "",
        senha: "",
        tipo: "",
    });
    // const [editingId, setEditingId] = useState(null);

    const api = "http://localhost:3030/userlogin";

    // useEffect(() => {
    //     fetchItems();
    // }, []);

    // const fetchItems = async () => {
    //     try {
    //     const response = await axios.get(`${api}/allusers`);
    //     setItems(response.data);
    //     console.log(response.data);
    //     } catch (err) {
    //     console.log("Algo deu errado...", err);
    //     }
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // if (editingId) {
        //     await axios.put(`${api}/${editingId}`, formData);
        // } else {
            await axios.post(`${api}`, formData);
        //}

        resetForm();
        location.href = "/home";
        // fetchItems();
        } catch (err) {
        console.log("Algo deu errado...", err);
        }
    };

    // const handleEdit = (item) => {
    //     setFormData({
    //     idUsuario: item.idUsuario || "",
    //     nome: item.nome || "",
    //     email: item.email || "",
    //     senha: item.senha || "",
    //     tipo: item.tipo || "",
    //     });
    //     setEditingId(item.idUsuario);
    // };

    // const handleDelete = async (idUsuario) => {
    //     try {
    //     await axios.delete(`${api}/${idUsuario}`);
    //     fetchItems();
    //     } catch (err) {
    //     console.log("Algo deu errado...", err);
    //     }
    // };

    const resetForm = () => {
        setFormData({
        idUsuario: "",
        nome: "",
        email: "",
        senha: "",
        tipo: "",
        });
        // setEditingId(null);
    };

    return (
        <div className={styles.container} /* {...props} */>
                <div className={styles.title}>
                    <h1>Centauro</h1>
                    <h2>Gestão Financeira Simplificada</h2>
                </div>
                <div className={styles.welcomeBackText}>
                    <h3>Bem vindo de volta!</h3>
                    <p>É um prazer tê-lo conosco novamente. </p>
                    <p>Faça seu login para continuarmos organizando sua vida financeira!</p>
                </div>
            <form onSubmit={handleSubmit} className={styles.formSignin} /*onSubmit={handleSubmitLoginForm} */>
                <div className={styles.containerInput}>
                    <input type="email" className={styles.emailAndPassword}
                        id="email"
                        placeholder="Digite seu email..."
                        required
                        /* onChange={(event) => setUsarName(event.target.value)} *//>
                    <FaUser size={20} className={styles.icon} />
                </div>
                <div className={styles.containerInput}>
                    <input type="password" className={styles.emailAndPassword}
                        id="password"
                        placeholder="Digite sua senha..."
                        required
                        /* onChange={(event) => setPassword(event.target.value)} *//>
                    <FaLock size={20} className={styles.icon} />
                </div>

                {/* <label className={styles.checkboxContainer}>
                    Lembre-se de mim
                    <input type="checkbox"
                    className={styles.checkbox}/>
                    <span className={styles.checkmark}></span>
                </label> */}

                <div className={styles.signUp}>
                    <p><a href="#">Cadastrar-se</a></p>
                </div>

                <button className={styles.btnSignin} id="btn-login">Sign in</button>
            </form>
        </div>
    )
}

export default SignIn;
