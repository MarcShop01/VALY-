// Configuration et variables globales
const ADMIN_PASSWORD = "valyla2024";
let products = [];
let users = [];
let orders = [];
let carts = [];
let isLoggedIn = false;

// Initialisation
document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded, setting up event listeners");
    setupEventListeners();
    checkAdminSession();
});

function setupEventListeners() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            console.log("Login form submitted");
            e.preventDefault();
            login();
        });
    } else {
        console.error("Login form not found");
    }
    
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", function(e) {
            e.preventDefault();
            addProduct();
        });
    }
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
    console.log("Login function called");
    const passwordInput = document.getElementById("adminPassword");
    if (!passwordInput) {
        console.error("Password input not found");
        return;
    }
    
    const password = passwordInput.value;
    console.log("Password entered:", password);
    
    if (password === ADMIN_PASSWORD) {
        console.log("Password correct");
        // Enregistrer la session
        localStorage.setItem("valylanegra-admin-session", JSON.stringify({
            timestamp: new Date().getTime(),
            isAdmin: true,
        }));
        
        showDashboard();
        loadData();
    } else {
        console.log("Password incorrect");
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
    const adminLogin = document.getElementById("adminLogin");
    const adminDashboard = document.getElementById("adminDashboard");
    
    if (adminLogin) adminLogin.style.display = "flex";
    if (adminDashboard) adminDashboard.style.display = "none";
    
    isLoggedIn = false;
}

function showDashboard() {
    const adminLogin = document.getElementById("adminLogin");
    const adminDashboard = document.getElementById("adminDashboard");
    
    if (adminLogin) adminLogin.style.display = "none";
    if (adminDashboard) adminDashboard.style.display = "block";
    
    isLoggedIn = true;
}

function loadData() {
    // Simuler le chargement des données
    updateStats();
    
    // Dans une application réelle, vous chargeriez les données depuis Firebase ici
    setTimeout(function() {
        const totalProductsElem = document.getElementById("totalProducts");
        const totalUsersElem = document.getElementById("totalUsers");
        const activeUsersElem = document.getElementById("activeUsers");
        const activeCartsElem = document.getElementById("activeCarts");
        
        if (totalProductsElem) totalProductsElem.textContent = "12";
        if (totalUsersElem) totalUsersElem.textContent = "45";
        if (activeUsersElem) activeUsersElem.textContent = "23";
        if (activeCartsElem) activeCartsElem.textContent = "8";
        
        // Simuler des données pour les listes
        const productsList = document.getElementById("productsList");
        if (productsList) {
            productsList.innerHTML = `
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
        }
        
        const usersList = document.getElementById("usersList");
        if (usersList) {
            usersList.innerHTML = `
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
                    <span class极速加速器="badge" style="background: #6b728极速加速器0; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">Inactive</span>
                </div>
            `;
        }
    }, 1000);
}

function updateStats() {
    // Simuler des statistiques
    const totalProductsElem = document.getElementById("totalProducts");
    const totalUsersElem = document.getElementById("totalUsers");
    const activeUsersElem = document.getElementById("activeUsers");
    const activeCartsElem = document.getElementById("activeCarts");
    
    if (totalProductsElem) totalProductsElem.textContent = "...";
    if (totalUsersElem) totalUsersElem.textContent = "...";
    if (activeUsersElem) activeUsersElem.textContent = "...";
    if (activeCartsElem) activeCartsElem.textContent = "...";
}

function addProduct() {
    alert("Fonctionnalité d'ajout de produit simulée. Dans une application réelle, cela enregistrerait le produit dans Firebase.");
    const productForm = document.getElementById("productForm");
    if (productForm) productForm.reset();
}

window.showSection = function(sectionName) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll(".admin-section");
    sections.forEach(function(section) {
        section.classList.remove("active");
    });
    
    // Désactiver tous les boutons
    const buttons = document.querySelectorAll(".sidebar-btn");
    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });
    
    // Activer la section demandée
    const targetSection = document.getElementById(sectionName + "Section");
    if (targetSection) targetSection.classList.add("active");
    
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
