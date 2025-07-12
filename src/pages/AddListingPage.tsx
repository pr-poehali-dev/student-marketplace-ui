import React, { useState } from "react";
import Header from "@/components/marketplace/Header";
import AddListing from "@/components/marketplace/AddListing";

interface AddListingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  dormitory: string;
  condition: "new" | "used" | "damaged";
}

const AddListingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AddListingFormData | null>(null);

  const handleFormNext = (data: AddListingFormData) => {
    setFormData(data);
    setCurrentStep(2);
    // Here you would implement the photo upload step
    console.log("Form data:", data);
  };

  const handleCancel = () => {
    // Navigate back to marketplace
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {currentStep === 1 && (
          <AddListing onNext={handleFormNext} onCancel={handleCancel} />
        )}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Шаг 2: Добавление фото</h2>
            <p className="text-muted-foreground mb-8">
              Этот функционал будет добавлен в следующей версии
            </p>
            <pre className="bg-muted p-4 rounded-lg text-left text-sm">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddListingPage;
