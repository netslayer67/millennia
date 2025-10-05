import { memo } from "react";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

const FaqCTA = memo(() => {
    return (
        <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                <div className="glass__noise absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none" />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 mb-6 mx-auto">
                    <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                    Still have questions?
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                    Our admissions team is here to help you discover if Millennia World School is the perfect fit for your child's educational journey.
                </p>

                {/* Contact options */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
                    <a
                        href="tel:+628211507100"
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald/10 hover:bg-emerald/20 border border-emerald/20 hover:border-emerald/40 transition-all duration-300 group"
                    >
                        <Phone className="w-5 h-5 text-emerald group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-emerald">Call Us</span>
                    </a>

                    <a
                        href="mailto:info@millennia21.id"
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/20 hover:border-gold/40 transition-all duration-300 group"
                    >
                        <Mail className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gold">Email Us</span>
                    </a>
                </div>

                {/* Main CTA */}
                <a
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group"
                >
                    <span>Contact Admissions</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Additional info */}
                <p className="text-sm text-muted-foreground mt-4">
                    📞 Available Monday - Friday, 8 AM - 5 PM WIB
                </p>
            </div>
        </div>
    );
});

FaqCTA.displayName = "FaqCTA";

export default FaqCTA;