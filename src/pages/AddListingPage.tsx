import React, { useState } from "react";
import Header from "@/components/marketplace/Header";
import AddListing from "@/components/marketplace/AddListing";
import PhotoUpload from "@/components/marketplace/PhotoUpload";
import SuccessModal from "@/components/marketplace/SuccessModal";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState<"published" | "stashed">(
    "published",
  );

  const handleFormNext = (data: AddListingFormData) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      window.history.back();
    }
  };

  const handlePublish = () => {
    // Here you would send the data to your backend
    console.log("Publishing listing:", formData);
    setSuccessType("published");
    setShowSuccessModal(true);
  };

  const handleSaveToStash = () => {
    // Here you would save the data to stash
    console.log("Saving to stash:", formData);
    setSuccessType("stashed");
    setShowSuccessModal(true);
  };

  const handleGoToHome = () => {
    window.location.href = "/";
  };

  const handleGoToMyListings = () => {
    window.location.href = "/my-listings";
  };

  const handleCreateAnother = () => {
    setCurrentStep(1);
    setFormData(null);
    setShowSuccessModal(false);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {currentStep === 1 && (
          <AddListing onNext={handleFormNext} onCancel={handleBack} />
        )}
        {currentStep === 2 && (
          <PhotoUpload
            formData={formData}
            onBack={handleBack}
            onPublish={handlePublish}
            onSaveToStash={handleSaveToStash}
          />
        )}
      </main>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        type={successType}
        onGoToHome={handleGoToHome}
        onGoToMyListings={handleGoToMyListings}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
};

export default AddListingPage;
