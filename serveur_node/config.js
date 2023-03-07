import { existsSync } from "fs";

const BASE = "/mnt/c/Users/Christophe/Documents/MesProjets/tourgo/serveur_node";
const PORT_HTTP = 3001;
const PRIVATE_KEY = "zjerYhe+7V";

if (!existsSync(BASE)) {
  console.log(
    "Erreur chargement config.js: le dossier " + BASE + " n'existe pas"
  );
  console.log("Vérifiez la variable BASE dans config.js");
  process.exit(1);
}

export const port_http = PORT_HTTP;
export const private_key = PRIVATE_KEY;
