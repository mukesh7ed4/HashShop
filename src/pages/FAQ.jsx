const FAQ = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unused and in original packaging."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days."
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 