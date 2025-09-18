import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getLivresByAuteurId } from "../services/LivreService";

import io from "socket.io-client"; // 👈 Importer le client socket.io
// ✅ Constantes pour les routes API
const API_URL_LIVRES = "http://localhost:5000/api/livres";
const API_URL_AUTEURS = "http://localhost:5000/api/auteurs";
const API_URL_USERS = "http://localhost:5000/api/users";
const API_URL_CONTACT = "http://localhost:5000/api/contact";
const API_URL_ACTUALITES = "http://localhost:5000/api/actualites";

function DashboardAdmin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // État pour la sidebar
    const [activeMenu, setActiveMenu] = useState("vue-ensemble");
    const [adminName, setAdminName] = useState("");
    const [livres, setLivres] = useState([]);
    const [livreSelectionne, setLivreSelectionne] = useState(null);
    const [actualiteSelectionnee, setActualiteSelectionnee] = useState(null);
    const [auteurSelectionnePourLivres, setAuteurSelectionnePourLivres] = useState(null);
    const [livresAuteur, setLivresAuteur] = useState([]);

    // ✅ États pour la gestion des actualités
    const [actualites, setActualites] = useState([]);
    const [loadingActualites, setLoadingActualites] = useState(true);
    // const [actualiteCounts, setActualiteCounts] = useState(0);

    // ✅ États pour la gestion des auteurs
    const [auteurs, setAuteurs] = useState([]);
    const [totalAuteurs, setTotalAuteurs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // S'aligne avec le backend
    const [loadingAuteurs, setLoadingAuteurs] = useState(true);

    // Utilisateurs
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loadingUtilisateurs, setLoadingUtilisateurs] = useState(true);
    const [totalUtilisateurs, setTotalUtilisateurs] = useState(0);
    const [currentPageUsers, setCurrentPageUsers] = useState(1);
    const [userSelectionne, setUserSelectionne] = useState(null); // Pour la modale "Voir"
    const [filtreRole, setFiltreRole] = useState(null); // Filtre par rôle
    const [filtreStatut, setFiltreStatut] = useState(null); // Filtre par statut
    const [userStats, setUserStats] = useState({ total: 0, parRole: {}, parStatut: {} });

    // ✅ États pour la newsletter
    const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
    const [loadingNewsletter, setLoadingNewsletter] = useState(true);
    const [totalNewsletter, setTotalNewsletter] = useState(0);

    // ✅ États pour les messages de contact
    const [contactMessages, setContactMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Notifications
    const [notifications, setNotifications] = useState([]);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const unreadNotificationsCount = notifications.filter(n => !n.read).length;

    const navigate = useNavigate();

    // Gérer l'affichage de la sidebar en fonction de la taille de l'écran
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 768); // md breakpoint
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Appel initial
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Récupération des notifications initiales ---
    useEffect(() => {
        const fetchInitialNotifications = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/notifications`, { // ✅ Utiliser la nouvelle route
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur récupération notifications");
                const initialNotifications = await res.json();
                // On utilise une fonction pour éviter les doublons si une notif arrive en même temps
                setNotifications(prev => {
                    const existingIds = new Set(prev.map(n => n.id));
                    const newNotifications = initialNotifications.filter(n => !existingIds.has(n.id));
                    return [...prev, ...newNotifications];
                });
            } catch (err) {
                console.error("Erreur fetch notifications initiales:", err);
            }
        };
        fetchInitialNotifications();
    }, []);

    // --- Connexion WebSocket pour les notifications en temps réel ---
    useEffect(() => {
        // Se connecte au serveur WebSocket
        const socket = io("http://localhost:5000");

        // Écoute l'événement 'nouvelle-notification'
        socket.on('nouvelle-notification', (newNotification) => {
            console.log('Notification reçue:', newNotification);
            // Ajoute la notification seulement si elle n'existe pas déjà
            setNotifications(prev => {
                const isAlreadyPresent = prev.some(n => n.id === newNotification.id);
                if (isAlreadyPresent) return prev;
                return [newNotification, ...prev];
            });
        });

        // Nettoyage à la fermeture du composant
        return () => {
            socket.disconnect();
        };
    }, []);
    // --- Récupération du nom de l'admin ---
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setAdminName(payload.user?.email || "Admin");
            } catch (err) {
                console.error("Erreur décodage token:", err);
                setAdminName("Admin");
            }
        }
    }, []);

    const fetchUtilisateurs = useCallback(async () => {
        setLoadingUtilisateurs(true);
        let url = `${API_URL_USERS}?page=${currentPageUsers}&limit=${itemsPerPage}`;
        if (filtreRole) {
            url += `&role=${filtreRole}`;
        }
        if (filtreStatut) {
            url += `&statut=${filtreStatut}`;
        }

        try {
            const res = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!res.ok) throw new Error("Erreur HTTP " + res.status);
            const { utilisateurs, total } = await res.json();
            // Si la page actuelle est vide mais qu'il y a des résultats, on revient à la page 1
            if (utilisateurs.length === 0 && total > 0 && currentPageUsers > 1) {
                setCurrentPageUsers(1);
            }
            setUtilisateurs(Array.isArray(utilisateurs) ? utilisateurs : []);
            setTotalUtilisateurs(total);
        } catch (err) {
            console.error("Erreur fetch utilisateurs:", err);
            setUtilisateurs([]);
        } finally {
            setLoadingUtilisateurs(false);
        }
    }, [currentPageUsers, itemsPerPage, filtreRole, filtreStatut]);

    // --- Récupération des utilisateurs ---
    useEffect(() => {
        fetchUtilisateurs();
    }, [fetchUtilisateurs]); // Se déclenche quand la page des utilisateurs change

    // --- Récupération des statistiques des utilisateurs ---
    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const res = await fetch(`${API_URL_USERS}/stats`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (!res.ok) throw new Error("Erreur stats");
                const data = await res.json();
                setUserStats({
                    total: data.total || 0,
                    parRole: data.parRole.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {}),
                    parStatut: data.parStatut.reduce((acc, item) => ({ ...acc, [item._id ? 'approuve' : 'en_attente']: item.count }), {}),
                });
            } catch (err) {
                console.error("Erreur fetch stats utilisateurs:", err);
            }
        };
        fetchUserStats();
    }, []); // Se charge une seule fois au montage du composant

    // ✅ Récupération des inscrits à la newsletter
    useEffect(() => {
        const fetchNewsletterSubscribers = async () => {
            setLoadingNewsletter(true);
            try {
                const res = await fetch("http://localhost:5000/api/newsletter/subscribers", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setNewsletterSubscribers(Array.isArray(data) ? data : []);
                setTotalNewsletter(data.length);
            } catch (err) {
                console.error("Erreur fetch inscrits newsletter:", err);
            } finally {
                setLoadingNewsletter(false);
            }
        };
        fetchNewsletterSubscribers();
    }, []); // Se charge une seule fois au montage du composant

    // ✅ Récupération des messages de contact
    useEffect(() => {
        const fetchContactMessages = async () => {
            if (activeMenu !== 'messages') return;

            setLoadingMessages(true);
            try {
                const res = await fetch(`${API_URL_CONTACT}/messages`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setContactMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur fetch messages de contact:", err);
            } finally {
                setLoadingMessages(false);
            }
        };
        fetchContactMessages();
    }, [activeMenu]);

    // ... (autres useEffects)

    // ✅ Récupération des actualités
    useEffect(() => {
        const fetchActualites = async () => {
            setLoadingActualites(true);
            try {
                const res = await fetch(API_URL_ACTUALITES, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setActualites(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur fetch actualités:", err);
                setActualites([]);
            } finally {
                setLoadingActualites(false);
            }
        };

        fetchActualites();
    }, []); // Le tableau de dépendances vide assure un seul appel

    


    // --- Récupération des livres ---
    useEffect(() => {
        const fetchLivres = async () => {
            try {
                const res = await fetch(API_URL_LIVRES, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setLivres(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur fetch livres:", err);
            }
        };
        fetchLivres();
    }, []);

    // --- Récupération des auteurs avec pagination ---
    useEffect(() => {
        const fetchAuteurs = async () => {
            setLoadingAuteurs(true);
            try {
                // Envoie les paramètres de pagination au backend
                const res = await fetch(`${API_URL_AUTEURS}?page=${currentPage}&limit=${itemsPerPage}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setAuteurs(Array.isArray(data.auteurs) ? data.auteurs : []);
                setTotalAuteurs(data.total);
            } catch (err) {
                console.error("Erreur fetch auteurs:", err);
                setAuteurs([]);
            } finally {
                setLoadingAuteurs(false);
            }
        };
        fetchAuteurs();
    }, [currentPage, itemsPerPage]); // Déclenche la requête à chaque changement de page

    // --- Fonctions d'action ---
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log("Déconnexion réussie côté serveur.");
            } else {
                console.warn("Échec de la déconnexion côté serveur, mais le client sera déconnecté.");
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion du serveur:", error);
        } finally {
            localStorage.removeItem("token");
            navigate("/"); // Redirige vers l'accueil après la déconnexion
        }
    };

    const handleRetour = () => {
        navigate("/");
    };

    // ✅ Fonctions pour la gestion des utilisateurs (à implémenter)
const handleApproveUser = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir approuver cet utilisateur ?")) {
        try {
            const res = await fetch(`${API_URL_USERS}/${userId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ estApprouve: true }),
            });
            if (!res.ok) throw new Error("Erreur lors de l'approbation");
            alert("Utilisateur approuvé avec succès !");
            // Rafraîchir la liste en forçant le re-fetch
            if (currentPageUsers === 1) {
                fetchUtilisateurs();
            } else {
                setCurrentPageUsers(1);
            }
        } catch (err) {
            console.error("Erreur d'approbation:", err);
            alert("Une erreur est survenue lors de l'approbation.");
        }
    }
};

const handleVoirUser = async (userId) => {
    try {
        const res = await fetch(`${API_URL_USERS}/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) throw new Error("Utilisateur non trouvé");
        const data = await res.json();
        setUserSelectionne(data.user); // Ouvre la modale avec les données de l'utilisateur
    } catch (err) {
        console.error("Erreur de visualisation:", err);
        alert("Impossible de récupérer les détails de l'utilisateur.");
    }
};

const handleModifierUser = (userId) => {
    // Redirige vers le formulaire de modification avec l'ID de l'utilisateur
    navigate(`/modifier-utilisateur/${userId}`);
};

const handleDeleteUser = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
        const res = await fetch(`${API_URL_USERS}/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) {
            alert("Utilisateur supprimé avec succès.");
            // Rafraîchir la liste en forçant le re-fetch
            if (currentPageUsers === 1) {
                fetchUtilisateurs();
            } else {
                setCurrentPageUsers(1);
            }
        } else {
            alert("Erreur lors de la suppression.");
        }
    }
};

    const handleFermerUserModal = () => {
        setUserSelectionne(null);
    };

    const handleVoirLivresAuteur = async (auteur) => {
        setAuteurSelectionnePourLivres(auteur);
        setLivresAuteur([]); // Vider la liste précédente
        try {
            const data = await getLivresByAuteurId(auteur._id);
            if (data && data.livres) {
                setLivresAuteur(data.livres);
            }
        } catch (err) {
            console.error("Erreur lors de la récupération des livres de l'auteur:", err);
            alert("Impossible de charger les livres de cet auteur.");
            setAuteurSelectionnePourLivres(null);
        }
    };

    const handleFermerModalLivresAuteur = () => {
        setAuteurSelectionnePourLivres(null);
        setLivresAuteur([]);
    };



    const handleFiltreRole = (role) => {
        setCurrentPageUsers(1); // Revenir à la première page
        setFiltreRole(role);
        setFiltreStatut(null); // Réinitialiser l'autre filtre
    };

    const handleFiltreStatut = (statut) => {
        setCurrentPageUsers(1);
        setFiltreStatut(statut);
        setFiltreRole(null);
    };

    // ✅ Logique de mise à jour du statut
    const handleUpdateStatus = async (auteurId, newStatus) => {
        try {
            const res = await fetch(`${API_URL_AUTEURS}/${auteurId}/statut`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ statut: newStatus }),
            });
            if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
            alert("Statut mis à jour !");
            setCurrentPage(1);
        } catch (err) {
            console.error("Erreur mise à jour statut:", err);
            alert("Erreur lors de la mise à jour du statut");
        }
    };

    // ✅ Ajoutez cette fonction :
    const handleVoirActualite = (actualite) => {
        setActualiteSelectionnee(actualite);
    };

    const handleFermerActualiteModal = () => {
        setActualiteSelectionnee(null);
    };

    // ✅ Fonctions pour les messages de contact
    const handleVoirMessage = (message) => {
        setSelectedMessage(message);
    };

    const handleFermerMessageModal = () => {
        setSelectedMessage(null);
    };

    const handleNotificationClick = () => {
        setIsNotificationsOpen(prev => !prev);
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const totalPages = Math.ceil(totalAuteurs / itemsPerPage);
    const totalPagesUsers = Math.ceil(totalUtilisateurs / itemsPerPage);

    const menuItems = [
        { key: "vue-ensemble", label: "Vue d'ensemble" },
        { key: "livres", label: "Livres" },
        { key: "auteurs", label: "Auteurs" },
        { key: "utilisateurs", label: "Utilisateurs" },
        { key: "actualites", label: "Actualités" },
        { key: "newsletter", label: "Newsletter" },
        { key: "messages", label: "Messages" },
        { key: "abonnements", label: "Abonnements" },
        { key: "revenus", label: "Revenus" },
        { key: "parametres", label: "Paramètres" },
    ];

    return (
        <div className="bg-[#DEDEDE] min-h-screen font-sans">
            {/* Barre latérale */}
            <aside className={`w-64 bg-[#160216] flex flex-col justify-between p-6 shadow-lg fixed top-0 left-0 h-full z-30 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h2>
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.key}
                                onClick={() => { setActiveMenu(item.key); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                                className={`cursor-pointer px-4 py-2 rounded-md transition-all font-semibold ${activeMenu === item.key
                                    ? "bg-white text-[#160216]"
                                    : "bg-[#160216] text-white hover:bg-white hover:text-[#160216]"
                                    }`}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[#ff0000] text-white py-2 rounded hover:bg-[#cc0000] transition"
                    >
                        Déconnexion
                    </button>
                    <button
                        onClick={handleRetour}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Retour sur la plateforme
                    </button>
                </div>
            </aside>

            {/* Contenu principal */}
            <main className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
                {/* Barre supérieure */}
                <div className="mx-4 sm:mx-6 my-6 p-4 sm:p-6 bg-[#F5F5F5] border border-gray-400 rounded-xl shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {/* Bouton Hamburger pour mobile */}
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                            Tableau de bord
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button onClick={handleNotificationClick} className="relative">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-800"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5M9 17H4l1.405-1.405A2.032 2.032 0 006 14.158V11a6 6 0 0112 0v3.159c0 .538.214 1.055.595 1.436L20 17h-5m-4 0v1a3 3 0 006 0v-1m-6 0h6"
                                    />
                                </svg>
                                {unreadNotificationsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                        {unreadNotificationsCount}
                                    </span>
                                )}
                            </button>
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border">
                                    <div className="p-4 font-bold border-b">Notifications</div>
                                    <ul className="max-h-96 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map(notif => (
                                                <li key={notif.id} className="border-b last:border-0">
                                                    <a href="#" className="block p-4 text-sm text-gray-700 hover:bg-gray-100">
                                                        {notif.message}
                                                    </a>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-4 text-sm text-gray-500 text-center">Aucune nouvelle notification</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 bg-white p-2 rounded-full">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profil"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="font-medium text-gray-800">{adminName}</span>
                        </div>
                    </div>
                </div>

                {/* Cartes de stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-4 sm:px-6">
                    {/* Abonnés */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Abonnés</h3>
                            <p className="text-2xl font-semibold">{userStats.parRole.abonné || 0}</p>
                        </div>
                    </div>

                    {/* Livres publiés */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Livres publiés</h3>
                            <p className="text-xl font-semibold">{livres.length}</p>
                        </div>
                    </div>

                    {/* Auteurs */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Auteurs</h3>
                            <p className="text-xl font-semibold">{totalAuteurs}</p>
                        </div>
                    </div>

                    {/* Inscrits Newsletter */}
                    {/* <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Inscrits Newsletter</h3>
                            <p className="text-xl font-semibold">{totalNewsletter}</p>
                        </div>
                    </div> */}

                    {/* Livres lus 75% */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Livres lus (75%)</h3>
                            <p className="text-xl font-semibold">80</p>
                        </div>
                    </div>

                    {/* Revenus */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Revenus</h3>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className="flex-1 p-4 sm:p-8">
                    {activeMenu === "vue-ensemble" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
                            <p>Statistiques globales : utilisateurs, livres, abonnements, revenus...</p>
                        </div>
                    )}

                    {activeMenu === "livres" && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Gestion des livres</h2>
                                <button
                                    onClick={() => navigate("/AjouterLivre")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter un livre
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {livres.map((livre) => (
                                    <div key={livre._id} className="bg-white p-4 rounded-lg shadow flex flex-col">
                                        <img
                                            src={
                                                livre.imageCouverture
                                                    ? `http://localhost:5000/${livre.imageCouverture}`
                                                    : "https://via.placeholder.com/100"
                                            }
                                            alt={livre.titre}
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <h3 className="font-bold">{livre.titre}</h3>
                                        <p className="text-gray-600">
                                            Auteur: {livre.auteur ? `${livre.auteur.prenoms} ${livre.auteur.nom}` : "Inconnu"}
                                        </p>
                                        <p className="text-gray-600">Pages: {livre.pages || "N/A"}</p>

                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => setLivreSelectionne(livre)}
                                                className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => navigate(`/livres/modifier/${livre._id}`)}
                                                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (window.confirm(`Supprimer le livre "${livre.titre}" ?`)) {
                                                        try {
                                                            const res = await fetch(`${API_URL_LIVRES}/${livre._id}`, {
                                                                method: "DELETE",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                                },
                                                            });
                                                            if (res.ok) {
                                                                setLivres(livres.filter((l) => l._id !== livre._id));
                                                                alert("Livre supprimé !");
                                                            } else {
                                                                alert("Erreur lors de la suppression");
                                                            }
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert("Erreur lors de la suppression");
                                                        }
                                                    }
                                                }}
                                                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Modal détail livre */}
                            {livreSelectionne && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
                                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
                                        <button
                                            onClick={() => setLivreSelectionne(null)}
                                            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-lg"
                                        >
                                            ✖
                                        </button>

                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
                                                {livreSelectionne.imageCouverture ? (
                                                    <img
                                                        src={`http://localhost:5000/${livreSelectionne.imageCouverture}`}
                                                        alt={livreSelectionne.titre}
                                                        className="max-h-full w-auto object-contain rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="text-6xl text-gray-500">📚</div>
                                                )}
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h1 className="text-2xl font-bold mb-2">{livreSelectionne.titre}</h1>
                                                    <p className="text-sm font-semibold mb-1">
                                                        {livreSelectionne.auteur ? `${livreSelectionne.auteur.prenoms} ${livreSelectionne.auteur.nom}` : "Inconnu"}
                                                    </p>
                                                    {livreSelectionne.coauteurs && (
                                                        <p className="text-sm text-gray-600 mb-1">
                                                            Co-auteurs: {livreSelectionne.coauteurs}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-700 mb-2">{livreSelectionne.description}</p>
                                                </div>

                                                {livreSelectionne.documentLivre && (
                                                    <iframe
                                                        src={`http://localhost:5000/${livreSelectionne.documentLivre}`}
                                                        className="w-full rounded-lg mt-4"
                                                        style={{ height: "50vh", border: "none" }}
                                                        title="Lecteur PDF"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeMenu === "auteurs" && (
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Gestion des auteurs</h2>
                                <button
                                    onClick={() => navigate("/AjouterUser")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter un auteur
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">
                                (Note: Seuls les auteurs approuvés sont affichés.)
                            </p>

                            {loadingAuteurs ? (
                                <div className="text-center py-10 text-gray-500">Chargement des auteurs...</div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto rounded-lg shadow-md">
                                        <table className="min-w-full bg-white border-collapse">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Nro</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Auteur</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Genres</th>
                                                    {/* ✅ Nouvelle colonne */}
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Livres</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Revenus</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Inscrit le</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {auteurs.length > 0 ? (
                                                    auteurs.map((auteur, index) => (
                                                        <tr key={auteur._id} className="border-b last:border-0 hover:bg-gray-50">
                                                            <td className="py-3 px-4">
                                                                {index + 1 + (currentPage - 1) * itemsPerPage}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={auteur.imageProfil ? `http://localhost:5000/${auteur.imageProfil}` : "https://via.placeholder.com/40"}
                                                                        alt={auteur.prenoms}
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                    />
                                                                    <span className="font-medium text-gray-800">
                                                                        {auteur.prenoms} {auteur.nom}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-600">{auteur.email}</td>
                                                            <td className="py-3 px-4">
                                                                <span
                                                                    className="px-3 py-1 text-xs font-bold rounded-full bg-green-200 text-green-800"
                                                                >
                                                                    {auteur.statut}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-600">{auteur.genrePrefere || 'N/A'}</td>
                                                            {/* ✅ Nouvelle cellule */}
                                                            <td className="py-3 px-4 text-gray-600 font-semibold">
                                                                <span className="cursor-pointer hover:text-blue-600" onClick={() => handleVoirLivresAuteur(auteur)}>
                                                                    {auteur.nombreDeLivres ?? 0}
                                                                </span>
                                                            </td>

                                                            <td className="py-3 px-4 font-semibold text-gray-700">{auteur.revenus} FG</td>
                                                            <td className="py-3 px-4 text-gray-600">
                                                                {auteur.dateCreation ? new Date(auteur.dateCreation).toLocaleDateString("fr-FR", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }) : 'N/A'}
                                                            </td>                                                            
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="9" className="text-center py-6 text-gray-500">
                                                            Aucun auteur trouvé.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {totalAuteurs > 0 && (
                                        <div className="flex justify-between items-center mt-6">
                                            <span className="text-sm text-gray-600">
                                                Résultats {(currentPage - 1) * itemsPerPage + 1} -{" "}
                                                {Math.min(currentPage * itemsPerPage, totalAuteurs)} sur {totalAuteurs}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Préc
                                                </button>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <button
                                                        key={i + 1}
                                                        onClick={() => setCurrentPage(i + 1)}
                                                        className={`px-4 py-2 border rounded-lg transition-all ${currentPage === i + 1
                                                            ? "bg-purple-600 text-white"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                            }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Suiv
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* Modale pour afficher les livres d'un auteur */}
                    {auteurSelectionnePourLivres && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl relative">
                                <button
                                    onClick={handleFermerModalLivresAuteur}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                                >
                                    &times;
                                </button>
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                                    Livres de {auteurSelectionnePourLivres.prenoms} {auteurSelectionnePourLivres.nom}
                                </h3>
                                {livresAuteur.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                                        {livresAuteur.map(livre => (
                                            <div key={livre._id} className="text-center">
                                                <img 
                                                    src={livre.imageCouverture ? `http://localhost:5000/${livre.imageCouverture}` : 'https://via.placeholder.com/100x150'} 
                                                    alt={livre.titre}
                                                    className="w-full h-48 object-cover rounded-md shadow-md"
                                                />
                                                <p className="mt-2 text-sm font-semibold truncate">{livre.titre}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-8">Cet auteur n'a publié aucun livre pour le moment.</p>
                                )}
                            </div>
                        </div>
                    )}

            


        {activeMenu === "utilisateurs" && (
            <div className="bg-white p-6 rounded-lg shadow-xl">
               <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Gestion des auteurs</h2>
                                <button
                                    onClick={() => navigate("/AjouterUser")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter un nouvel utilisateur
                                </button>
                            </div>

                {/* Cartes de filtres */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                    <div onClick={() => { setFiltreRole(null); setFiltreStatut(null); setCurrentPageUsers(1); }} className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${!filtreRole && !filtreStatut ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <h4 className="font-bold">Tous</h4>
                        <p className="text-2xl">{userStats.total}</p>
                    </div>
                    <div onClick={() => handleFiltreRole('administrateur')} className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${filtreRole === 'administrateur' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <h4 className="font-bold">Admins</h4>
                        <p className="text-2xl">{userStats.parRole.administrateur || 0}</p>
                    </div>
                    <div onClick={() => handleFiltreRole('auteur')} className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${filtreRole === 'auteur' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <h4 className="font-bold">Auteurs</h4>
                        <p className="text-2xl">{userStats.parRole.auteur || 0}</p>
                    </div>
                    <div onClick={() => handleFiltreStatut('approuve')} className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${filtreStatut === 'approuve' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <h4 className="font-bold">Approuvés</h4>
                        <p className="text-2xl">{userStats.parStatut.approuve || 0}</p>
                    </div>
                    <div onClick={() => handleFiltreStatut('en_attente')} className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${filtreStatut === 'en_attente' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <h4 className="font-bold">En attente</h4>
                        <p className="text-2xl">{userStats.parStatut.en_attente || 0}</p>
                    </div>
                </div>

                {loadingUtilisateurs ? (
                    <div className="text-center py-10 text-gray-500">Chargement des utilisateurs...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg shadow-md">
                            <table className="min-w-full bg-white border-collapse">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-600">N°</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Nom</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Rôle</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
                                        <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {utilisateurs.length > 0 ? (
                                        utilisateurs.map((user, index) => (
                                            <tr key={user._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 text-gray-600">
                                                    {index + 1 + (currentPageUsers - 1) * itemsPerPage}
                                                </td>
                                                <td className="py-3 px-4 font-medium text-gray-800">
                                                    {user.prenoms} {user.nom}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                                <td className="py-3 px-4 text-gray-600">{user.role}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.estApprouve ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                        {user.estApprouve ? 'Approuvé' : 'En attente'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 flex gap-2">
                                                    {user.estApprouve ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleModifierUser(user._id)}
                                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                                            >
                                                                Modifier
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleApproveUser(user._id)}
                                                            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                                                        >
                                                            Approuver
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleVoirUser(user._id)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                                    >
                                                        Voir
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                                Aucun utilisateur trouvé pour les filtres sélectionnés.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination pour les utilisateurs */}
                        {totalUtilisateurs > itemsPerPage && (
                            <div className="flex justify-between items-center mt-6">
                                <span className="text-sm text-gray-600">
                                    Résultats {(currentPageUsers - 1) * itemsPerPage + 1} -{" "}
                                    {Math.min(currentPageUsers * itemsPerPage, totalUtilisateurs)} sur {totalUtilisateurs}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPageUsers((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPageUsers === 1}
                                        className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Préc
                                    </button>
                                    {[...Array(totalPagesUsers)].map((_, i) => (
                                        <button
                                            key={`user-page-${i + 1}`}
                                            onClick={() => setCurrentPageUsers(i + 1)}
                                            className={`px-4 py-2 border rounded-lg transition-all ${currentPageUsers === i + 1
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPageUsers((prev) => Math.min(prev + 1, totalPagesUsers))}
                                        disabled={currentPageUsers === totalPagesUsers}
                                        className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Suiv
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        )}

                    {activeMenu === "actualites" && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Gestion des actualités</h2>
                                <button
                                    onClick={() => navigate("/AjouterActualite")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter une actualité
                                </button>
                            </div>
                            {loadingActualites ? (
                                <div className="text-center py-10 text-gray-500">Chargement des actualités...</div>
                            ) : (
                                <div id="listeActualites" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {actualites.length > 0 ? (
                                        actualites.map((actualite) => (
                                            <div key={actualite._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                                                <img
                                                    src={actualite.image ? `http://localhost:5000/${actualite.image}` : "https://via.placeholder.com/200x150"}
                                                    alt={actualite.titre}
                                                    className="w-full h-40 object-cover rounded mb-4"
                                                />
                                                <h3 className="text-lg font-bold mb-1">{actualite.titre}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{actualite.extrait}</p>
                                                <div className="flex justify-between items-center text-sm text-gray-500">
                                                    <span>Publié le: {new Date(actualite.dateEvenement).toLocaleDateString()}</span>
                                                    <span>Par: {actualite.publiePar?.nom || "Admin"}</span>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleVoirActualite(actualite)}
                                                        className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                                    >
                                                        Voir
                                                    </button>
                                                    <button
                                                        onClick={() => alert('Fonctionnalité "Modifier" à implémenter')}
                                                        className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => alert('Fonctionnalité "Supprimer" à implémenter')}
                                                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 col-span-full text-center">Aucune actualité trouvée.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ✅ Modal de détail pour l'actualité */}
                    {actualiteSelectionnee && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                                <button
                                    onClick={handleFermerActualiteModal}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-3xl leading-none font-semibold"
                                >
                                    &times;
                                </button>
                                {/* Le contenu de la modale sera ajouté ici */}
                            </div>
                        </div>
                    )}

                    {/* ✅ Section Newsletter */}
                    {activeMenu === "newsletter" && (
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Inscrits à la Newsletter</h2>
                            {loadingNewsletter ? (
                                <div className="text-center py-10 text-gray-500">Chargement...</div>
                            ) : (
                                <div className="overflow-x-auto rounded-lg shadow-md">
                                    <table className="min-w-full bg-white border-collapse">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">N°</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Date d'inscription</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsletterSubscribers.length > 0 ? (
                                                newsletterSubscribers.map((subscriber, index) => (
                                                    <tr key={subscriber._id} className="border-b last:border-0 hover:bg-gray-50">
                                                        <td className="py-3 px-4">{index + 1}</td>
                                                        <td className="py-3 px-4 font-medium text-gray-800">{subscriber.email}</td>
                                                        <td className="py-3 px-4 text-gray-600">
                                                            {new Date(subscriber.dateInscription).toLocaleDateString("fr-FR", {
                                                                day: '2-digit',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-6 text-gray-500">
                                                        Aucun inscrit à la newsletter pour le moment.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ✅ Section Messages de Contact */}
                    {activeMenu === "messages" && (
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Messages de Contact</h2>
                            {loadingMessages ? (
                                <div className="text-center py-10 text-gray-500">Chargement des messages...</div>
                            ) : (
                                <div className="overflow-x-auto rounded-lg shadow-md">
                                    <table className="min-w-full bg-white border-collapse">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Date</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Nom</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Message (Extrait)</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactMessages.length > 0 ? (
                                                contactMessages.map((msg) => (
                                                    <tr key={msg._id} className="border-b last:border-0 hover:bg-gray-50">
                                                        <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                                                            {new Date(msg.dateEnvoi).toLocaleDateString("fr-FR")}
                                                        </td>
                                                        <td className="py-3 px-4 font-medium">{msg.nom}</td>
                                                        <td className="py-3 px-4 text-gray-600">{msg.email}</td>
                                                        <td className="py-3 px-4 text-gray-600 truncate max-w-xs">{msg.message}</td>
                                                        <td className="py-3 px-4">
                                                            <button
                                                                onClick={() => handleVoirMessage(msg)}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                                            >
                                                                Lire & Répondre
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-6 text-gray-500">
                                                        Aucun message de contact.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ✅ Modale pour lire et répondre à un message */}
                    {selectedMessage && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl relative">
                                <button onClick={handleFermerMessageModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
                                <h3 className="text-2xl font-bold mb-4">Message de {selectedMessage.nom}</h3>
                                <div className="bg-gray-50 p-4 rounded-md mb-6">
                                    <p className="font-semibold">De : <a href={`mailto:${selectedMessage.email}`} className="text-blue-600">{selectedMessage.email}</a></p>
                                    <p className="font-semibold">Le : {new Date(selectedMessage.dateEnvoi).toLocaleString("fr-FR")}</p>
                                    <p className="mt-4 whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Répondre</h4>
                                <form action={`mailto:${selectedMessage.email}`} method="GET">
                                    <textarea
                                        name="body"
                                        rows="5"
                                        className="w-full p-2 border rounded-md"
                                        placeholder={`Bonjour ${selectedMessage.nom},\n\nMerci pour votre message...\n\nCordialement,\nL'équipe Djanguin`}
                                    ></textarea>
                                    <button type="submit" className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                                        Ouvrir dans le client mail
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Modale pour voir un utilisateur */}
                    {userSelectionne && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
                                <button
                                    onClick={handleFermerUserModal}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                                >
                                    &times;
                                </button>
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">Détails de l'utilisateur</h3>
                                <div className="flex items-center gap-6 mb-6">
                                    <img
                                        src={userSelectionne.imageProfil ? `http://localhost:5000/${userSelectionne.imageProfil}` : "https://via.placeholder.com/100"}
                                        alt="Profil"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                    />
                                    <div>
                                        <p className="text-xl font-semibold">{userSelectionne.prenoms} {userSelectionne.nom}</p>
                                        <p className="text-gray-600">{userSelectionne.email}</p>
                                        <p className="text-gray-600">{userSelectionne.role}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold text-gray-600">Téléphone:</span>
                                        <span>{userSelectionne.telephone || 'Non fourni'}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold text-gray-600">Date de naissance:</span>
                                        <span>
                                            {userSelectionne.dateNaissance
                                                ? new Date(userSelectionne.dateNaissance).toLocaleDateString('fr-FR')
                                                : 'Non fournie'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold text-gray-600">Genre préféré:</span>
                                        <span>{userSelectionne.genrePrefere || 'Non spécifié'}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold text-gray-600">Inscrit le:</span>
                                        <span>{new Date(userSelectionne.dateCreation).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="font-semibold text-gray-600 mb-1">Biographie:</p>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                                            {userSelectionne.biographie || 'Aucune biographie.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 text-right">
                                    <button
                                        onClick={handleFermerUserModal}
                                        className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default DashboardAdmin;