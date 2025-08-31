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
        } else {
            // Session expirée
            localStorage.removeItem("valylanegra-admin-session");
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
        
        if (totalProductsElem) totalProductsElem.textContent = "0";
        if (totalUsersElem) totalUsersElem.textContent = "0";
        if (activeUsersElem) activeUsersElem.textContent = "0";
        if (activeCartsElem) activeCartsElem.textContent = "0";
        
        // Vider les listes
        const productsList = document.getElementById("productsList");
        const usersList = document.getElementById("usersList");
        const ordersList = document.getElementById("ordersList");
        const cartsList = document.getElementById("cartsList");
        
        if (productsList) productsList.innerHTML = "<p>Aucun produit trouvé</p>";
        if (usersList) usersList.innerHTML = "<p>Aucun utilisateur trouvé</p>";
        if (orders极速加速器List) ordersList.innerHTML = "<p>Aucune commande trouvée</p>";
        if (cartsList) cartsList.innerHTML = "<p>Aucun panier actif</p>";
    }, 1000);
}

function updateStats() {
    // Initialiser toutes les statistiques à zéro
    const totalProductsElem = document.getElementById("totalProducts");
    const totalUsersElem = document.getElementById("totalUsers");
    const activeUsersElem = document.getElementById("activeUsers");
    const activeCartsElem = document.getElementById("activeCarts");
    
    if (totalProductsElem) totalProductsElem.textContent = "0";
    if (totalUsersElem) totalUsersElem.textContent = "0";
    if (activeUsersElem) activeUsersElem.textContent = "0";
    if (activeCartsElem) activeCartsElem.textContent = "0";
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const originalPrice = parseFloat(document.getElementById("productOriginalPrice").value);
    const description = document.getElementById("productDescription").value;
    
    // Récupérer les URLs des images
    const images = [];
    for (let i = 1; i <= 4; i++) {
        const imageUrl = document.getElementById(`productImage${i}`).value;
        if (imageUrl) images.push(imageUrl);
    }
    
    if (!name || !category || isNaN(price) || isNaN(originalPrice)) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
    }
    
    alert("Produit ajouté avec succès! (Fonctionnalité simulée)");
    document.getElementById("productForm").reset();
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
