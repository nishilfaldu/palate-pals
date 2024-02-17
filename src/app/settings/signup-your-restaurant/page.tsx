
import { SignupYourRestaurantForm } from "@/app/_components/Account/SignupYourRestaurantForm";
import { Separator } from "@/components/ui/separator";



export default function SignupYourRestaurantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Signup your restaurant</h3>
        <p className="text-sm text-muted-foreground">
          Update your professional settings
        </p>
      </div>
      <Separator />
      <SignupYourRestaurantForm />
    </div>
  );
}
