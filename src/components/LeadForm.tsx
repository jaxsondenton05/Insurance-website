import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Upload, FileText, X, ChevronRight, ChevronLeft } from "lucide-react";

import { submitQuote } from "../services/quoteService";

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coverageTypes: [] as string[],
    notes: ""
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("Submitting form data:", formData);
      await submitQuote({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        coverageTypes: formData.coverageTypes,
        fileName: fileName
      });
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Submission failed:", error);
      // Try to parse the specific error message if it's the JSON format we added
      let message = "We encountered an issue processing your request. Please try again or contact jaxson@crgia.com directly.";
      try {
        if (error.message && error.message.startsWith("{")) {
          const info = JSON.parse(error.message);
          message = `Error ${info.operationType}: ${info.error}`;
        }
      } catch (e) {}
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-24 bg-white text-obsidian" id="contact">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-8" />
            <h2 className="font-display text-4xl font-bold mb-4 italic uppercase">Thank You!</h2>
            <p className="text-neutral-500 leading-relaxed mb-8 font-light italic">
              Jaxson Denton has received your request. We will review your documentation and reach out to you from <span className="font-bold text-obsidian">jaxson@crgia.com</span> within 24 business hours.
            </p>
            <button 
              onClick={() => { setStep(1); setIsSuccess(false); setFormData({ name: "", email: "", phone: "", address: "", coverageTypes: [], notes: "" }); setFileName(null); }}
              className="text-sm font-bold uppercase tracking-widest text-clay hover:underline"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-bone text-obsidian" id="contact">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 italic uppercase">Request A <span className="text-clay">Quote</span></h2>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-black/5">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-12">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1 flex-1 transition-all duration-500 ${step >= s ? "bg-clay" : "bg-neutral-100"}`} 
                />
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 italic text-left">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Your Name"
                          className="w-full px-4 py-4 bg-bone/50 border border-neutral-200 focus:border-clay outline-none transition-colors"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="Jaxson@crgia.com"
                          className="w-full px-4 py-4 bg-bone/50 border border-neutral-200 focus:border-clay outline-none transition-colors"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-4 bg-bone/50 border border-neutral-200 focus:border-clay outline-none transition-colors"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 italic">Mailing Address</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Street, City, ZIP"
                          className="w-full px-4 py-4 bg-bone/50 border border-neutral-200 focus:border-clay outline-none transition-colors italic"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full py-4 bg-clay text-bone font-bold uppercase tracking-widest hover:bg-obsidian transition-colors flex items-center justify-center gap-2"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4 italic">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Select Coverage Interests</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["Home", "Auto", "Business"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              const types = formData.coverageTypes.includes(type)
                                ? formData.coverageTypes.filter(t => t !== type)
                                : [...formData.coverageTypes, type];
                              setFormData({...formData, coverageTypes: types});
                            }}
                            className={`p-4 text-xs font-bold uppercase tracking-tight text-center transition-all ${
                              formData.coverageTypes.includes(type) 
                                ? "bg-clay text-bone" 
                                : "bg-bone text-neutral-500 hover:bg-neutral-200 font-light"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                       <button type="button" onClick={prevStep} className="flex-1 py-4 border border-neutral-200 text-neutral-400 font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-clay text-bone font-bold uppercase tracking-widest hover:bg-obsidian transition-colors flex items-center justify-center gap-2">
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 italic">Current Insurance Document</label>
                      <p className="text-sm text-neutral-500 mb-4 font-light leading-relaxed italic">
                        Upload your current policy's <span className="font-bold text-obsidian">Declarations Page</span>. This allows Jaxson to perform an immediate risk audit and identify protection gaps.
                      </p>
                      
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-200 bg-bone/30 p-12 text-center rounded-sm hover:border-clay transition-all cursor-pointer group"
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden" 
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center">
                          {fileName ? (
                            <div className="flex items-center gap-3 bg-white px-4 py-2 border border-clay text-clay rounded-md">
                              <FileText className="w-5 h-5 italic" />
                              <span className="text-sm font-medium italic">{fileName}</span>
                              <X className="w-4 h-4 cursor-pointer hover:scale-110" onClick={(e) => { e.stopPropagation(); setFileName(null); }} />
                            </div>
                          ) : (
                            <>
                              <Upload className="w-12 h-12 text-neutral-300 group-hover:text-clay transition-colors mb-4" />
                              <span className="text-sm text-neutral-500 italic">Drop PDF or PNG/JPG here</span>
                              <span className="text-[10px] text-neutral-400 mt-2 uppercase tracking-widest italic font-bold">Max file size 10MB</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                       <button type="button" onClick={prevStep} className="flex-1 py-4 border border-neutral-200 text-neutral-400 font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 italic">
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="flex-[2] py-4 bg-clay text-bone font-bold uppercase tracking-widest hover:bg-obsidian transition-all duration-300 disabled:opacity-50 italic disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Processing..." : "Finalize Request"}
                      </button>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs italic text-center rounded-sm">
                        {submitError}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
