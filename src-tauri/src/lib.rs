// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// This function extracts the version from Cargo.toml
#[tauri::command]
fn get_app_version() -> String {
    // Access the CARGO_PKG_VERSION environment variable that Cargo sets
    // This variable contains the version from Cargo.toml
    let version = env!("CARGO_PKG_VERSION");
    version.to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_app_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
