import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

const main = () => {
    Server.start();
    // console.log(envs);
}

(async () => {
    main();
})();