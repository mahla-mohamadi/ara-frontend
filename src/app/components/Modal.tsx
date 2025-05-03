'use client';

import { useContext, useEffect, useState , useRef  } from 'react';
import axios from 'axios';
import { AuthContext } from "@/app/context/AuthContext";

interface Field {
    label: string;
    key: string;
    is_binary: boolean;
    render: ((data: any) => JSX.Element) | null;
    hidden: boolean;
}
interface Term {
    id: number;
    name: string;
    children?: Term[];
}
interface ModalProps {
    fields: Field[];
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    formData: Record<string, any>;
    theRout: { type: string; rout: string };
    addData?: Record<string, any>;
    forParent?: Term[];
}
const GeneralModal: React.FC<ModalProps> = ({
    fields,
    isOpen,
    onClose,
    onSubmit,
    formData,
    theRout,
    addData = {},
    forParent = []
}) => {
    const context = useContext(AuthContext);
    const authToken = context?.authToken ?? null;
    const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
    const [selectedParent, setSelectedParent] = useState<string>(formData?.parent || "");
    const [closing, setClosing] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    //Form Data Handler
    useEffect(() => {
        fields.forEach((field) => {
            const el = inputRefs.current[field.key];
            if (el) {
            if (field.is_binary && el instanceof HTMLInputElement) {
                el.checked = !!formData[field.key];  // Use formData here
            } else if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
                el.value = formData[field.key] || "";  // Use formData here
            }
            }
        });
    }, [formData, isOpen, fields]); 
    const flattenTerms = (terms: Term[]): Term[] => {
        return terms.flatMap(term => [term, ...(term.children ? flattenTerms(term.children) : [])]);
    };
    const flatTerms = flattenTerms(forParent); 
    const handleSubmit = () => {
        const formData: Record<string, any> = {};
        fields.forEach((field) => {
            const el = inputRefs.current[field.key];
            if (el) {
                if (field.is_binary && el instanceof HTMLInputElement) {
                    formData[field.key] = el.checked ? 1 : 0;
                } else if (field.key === "parent") {
                    formData[field.key] = selectedParent;
                } else {
                    formData[field.key] = el.value;
                }
            }
        });
        onSubmit(formData);
    };
    //Modal Animation Part
    useEffect(() => {
        if (isOpen) {
            setClosing(false); // Reset closing state when the modal is open
        }
    }, [isOpen]);
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.classList.add("modal-open");
            modalRef.current.classList.remove("modal-close");
        } else if (modalRef.current) {
            modalRef.current.classList.add("modal-close");
            modalRef.current.classList.remove("modal-open");
        }
    }, [isOpen]);
    useEffect(() => {
        if (closing && modalRef.current && overlayRef.current) {
            modalRef.current.classList.add("modal-close");
            modalRef.current.classList.remove("modal-open");
            overlayRef.current.classList.add("overlay-close");
            overlayRef.current.classList.remove("overlay-open");
        }
    }, [closing]);
    const closeModalWithAnimation = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };
    if (!isOpen) return null;
    return (
        <div ref={overlayRef} tabIndex={-1} aria-hidden="true" className="transition-all delay-75 flex bg-[#1a181885] backdrop-filter-[blur(2px)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-full">
            <div className="transition-all delay-75 relative p-4 w-full max-w-2xl max-h-full m-auto">
                <div
                ref={modalRef}
                className="relative bg-white  rounded-lg shadow-sm dark:bg-gray-700 transform transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                        <button onClick={closeModalWithAnimation} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 md:p-5 space-y-4 flex flex-wrap justify-between">
                        {fields.map((field, index) => {
                            if (typeof field.render !== "function" || field.key === "parent") {
                                if (field.is_binary) {
                                    return (
                                        <div key={index} className="w-[49%]">
                                            <label className="flex items-center gap-4 cursor-pointer">{field.label}
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    ref={el => inputRefs.current[field.key] = el}
                                                />
                                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    );
                                } else if (field.key === "parent") {
                                    return (
                                        <div key={index} className="w-[49%]">
                                            <label htmlFor={field.key} className="block mb-2 text-sm font-medium text-neutral-800">
                                                {field.label}
                                            </label>
                                            <select
                                                id={field.key}
                                                value={selectedParent}
                                                onChange={(e) => setSelectedParent(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                ref={(el) => inputRefs.current[field.key] = el}
                                            >
                                                <option value="0">بدون والد</option>
                                                {flatTerms.map(term => (
                                                    <option key={term.id} value={term.id}>
                                                        {term.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="w-[49%]">
                                            <label htmlFor={field.key} className="block mb-2 text-[12px] font-medium text-neutral-800">
                                                {field.label}
                                            </label>
                                            <input
                                                type="text"
                                                id={field.key}
                                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500"
                                                ref={(el) => inputRefs.current[field.key] = el}
                                            />
                                        </div>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={() => {
                                onClose();
                                handleSubmit();
                            }}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            افزودن
                        </button>
                        <button
                            onClick={closeModalWithAnimation}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700"
                        >
                            انصراف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralModal;
