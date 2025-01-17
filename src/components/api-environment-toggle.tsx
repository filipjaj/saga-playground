import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch";
import { useAPIEnvironment } from "@/context/api-environment";

export function APIEnvironmentToggle() {
  const { environment, setEnvironment } = useAPIEnvironment();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="api-environment"
        checked={environment === "beta"}
        onCheckedChange={(checked) => setEnvironment(checked ? "beta" : "production")}
      />
      <Label htmlFor="api-environment">Use Beta API</Label>
    </div>
  );
}
