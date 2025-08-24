// Configuration et variables globales
const ADMIN_PASSWORD = "valyla2024";
let products = [];
let users = [];
let orders = [];
let carts = [];
let isLoggedIn = false;

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    checkAdminSession();
});

function setupEventListeners() {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    });
    
    document.getElementById("productForm").addEventListener("submit", (e极速加速器) => {
        e.preventDefault();
        addProduct();
    });
}

function checkAdminSession() {
    const adminSession = localStorage.getItem("valylanegra-admin-session");
    if (adminSession) {
        const sessionData = JSON.parse(adminSession);
        const now = new Date().getTime();
        // Vérifier si la session est encore valide (24 heures)
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
            showDashboard();
            loadData();
            return;
        }
    }
    showLogin();
}

function login() {
    const passwordInput = document.getElementById("adminPassword");
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        // Enregistrer la session
        localStorage.setItem("valylanegra-admin-session", JSON.stringify({
            timestamp: new Date().getTime(),
            isAdmin: true,
        }));
        
        showDashboard();
        loadData();
    } else {
        alert("Mot de passe incorrect!");
        passwordInput.value = "";
        passwordInput.focus();
    }
}

function logout() {
    localStorage.removeItem("valylanegra-admin-session");
    showLogin();
}

function showLogin() {
    document.getElementById("adminLogin").style.display = "flex";
    document.getElementById("adminDashboard").style.display = "none";
    isLoggedIn = false;
}

function showDashboard() {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminDashboard").style.display = "block";
    isLoggedIn = true;
}

function loadData() {
    // Simuler le chargement des données
    updateStats();
    
    // Dans une application réelle, vous chargeriez les données depuis Firebase ici
    setTimeout(() => {
        document.getElementById("totalProducts").textContent = "12";
        document.getElementById("totalUsers").textContent = "45";
        document.getElementById("activeUsers").textContent = "23";
        document.getElementById("activeCarts").textContent = "8";
        
        // Simuler des données pour les listes
        document.getElementById("productsList").innerHTML = `
            <div class="product-grid">
                <div class="product-card">
                    <h3>Robes d'été</h3>
                    <p>Prix: $29.99</p>
                    <p>Catégorie: Vêtements</p>
                    <button class="btn btn-danger">Supprimer</button>
                </div>
                <div class="product-card">
                    <h3>Chaussures à talons</h3>
                    <p>Prix: $49.99</p>
                    <p>Catégorie: Chaussures</p>
                    <button class="btn btn-danger">Supprimer</button>
                </div>
            </div>
        `;
        
        document.getElementById("usersList").innerHTML = `
            <div class="user-card">
                <h3>Marie Dupont</h3>
                <p>Email: marie@example.com</p>
                <p>Inscrite le: 15/05/2023</p>
                <span class="badge" style="background: #ff4d94; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">Active</span>
            </div>
            <div class="user-card">
                <h3>Julie Martin</h3>
                <p>Email: julie@example.com</p>
                <p>Inscrite le: 22/06/2023</p>
                <span class="badge" style="background: #6b7280; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">Inactive</span>
            </div>
        `;
    }, 1000);
}

function updateStats() {
    // Simuler des statistiques
    document.getElementById("totalProducts").textContent = "...";
    document.getElementById("totalUsers").textContent = "...";
    document.getElementById("activeUsers").textContent = "...";
    document.getElementById("activeCarts").textContent = "...";
}

function addProduct() {
    alert("Fonctionnalité d'ajout de produit simulée. Dans une application réelle, cela enregistrerait le produit dans Firebase.");
    document.getElementById("productForm").reset();
}

window.showSection = function(sectionName) {
    // Masquer toutes les sections
    document.querySelectorAll(".admin-section").forEach((section) => {
        section.classList.remove("active");
    });
    
    // Désactiver tous les boutons
    document.querySelectorAll(".sidebar-btn").forEach((btn) => {
        btn.classList.remove("active");
    });
    
    // Activer la section demandée
    document.getElementById(sectionName + "Section").classList.add("active");
    
    // Activer le bouton cliqué
    event.target.classList.add("active");
    
    // Recharger les données si nécessaire
    if (sectionName === "dashboard") updateStats();
}

// Fonctions pour la gestion des produits (simulées)
window.deleteProduct = function(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
        alert("Produit supprimé (simulation)");
    }
};