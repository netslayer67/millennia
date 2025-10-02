import React from 'react';
import { motion } from 'framer-motion';
import { certificatesToIssue } from '@/data/superAdminData';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle } from 'lucide-react';

const CertificatesPage = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Penerbitan Sertifikat</h1>
                <p className="text-white/60 mt-1">Review dan terbitkan sertifikat untuk murid yang telah lulus.</p>
            </div>

            <div className="bg-gray-900/50 border border-white/10 rounded-2xl backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-4 text-sm font-medium text-white/60">Murid</th>
                                <th className="p-4 text-sm font-medium text-white/60">Program</th>
                                <th className="p-4 text-sm font-medium text-white/60">Skor Akhir</th>
                                <th className="p-4 text-sm font-medium text-white/60">Tanggal Kelulusan</th>
                                <th className="p-4 text-sm font-medium text-white/60">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificatesToIssue.map((cert) => (
                                <tr key={cert.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={cert.avatar} className="w-10 h-10 rounded-full" />
                                        <p className="font-semibold">{cert.name}</p>
                                    </td>
                                    <td className="p-4">{cert.program}</td>
                                    <td className="p-4 font-semibold text-sky-400">{cert.score}</td>
                                    <td className="p-4">{cert.completionDate}</td>
                                    <td className="p-4">
                                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                                            <Award className="w-4 h-4" /> Terbitkan
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default CertificatesPage;