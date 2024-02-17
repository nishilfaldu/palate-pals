import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@clerk/nextjs";



export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account information here. This is how we personalize and secure your experience.
        </p>
      </div>
      <Separator />
      <UserProfile/>
    </div>
  );
}
