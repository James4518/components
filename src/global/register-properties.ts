import { formatUTC } from "@/utils/format";
import { App } from "vue";
export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUTC(value);
    }
  };
}
