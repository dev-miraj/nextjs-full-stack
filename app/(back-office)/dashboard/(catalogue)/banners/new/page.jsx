import FormHeader from "@/components/backoffice/FormHeader";
import BannerForm from "@/components/backoffice/Forms/BannerForm";
import { getData } from "@/lib/getData";

export default function NewBanner() {
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannerForm />
    </div>
  );
}
