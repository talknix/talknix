import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔹 Replace with your actual Supabase URL and ANON KEY
const SUPABASE_URL = "https://ycudikakmvxaysnvtrhj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdWRpa2FrbXZ4YXlzbnZ0cmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzI4MDQsImV4cCI6MjA1NzAwODgwNH0.Qf8-bIXidKhMuSsxprvriBxZ_ypYsbhLJmxNuzbQ_sQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🔹 Handle Google Login
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            console.error("Login Error:", error.message);
        } else {
            console.log("Logging in...");
        }
    });
}

// 🔹 Check if User is Logged In (For Protected Pages)
const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user && window.location.pathname !== "/login.html") {
        window.location.href = "login.html";
    } else if (user && window.location.pathname === "/login.html") {
        window.location.href = "index.html";
    }

    // Show user details on index.html
    const userInfo = document.getElementById("user-info");
    if (userInfo && user) {
        userInfo.innerHTML = `Logged in as: ${user.email}`;
    }
};

checkAuth();

// 🔹 Logout Function
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await supabase.auth.signOut();
        window.location.href = "login.html";
    });
}
