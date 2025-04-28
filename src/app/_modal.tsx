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
    formData: Record<string, any>;  // Accept formData as a prop
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
    const authToken = context?.authToken ?? null; // ✅ Safe access
    const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
    // const { authToken } = useContext(AuthContext);
    const [selectedParent, setSelectedParent] = useState<string>(formData?.parent || "");

    // useEffect(() => {
    //     if (onEdit && authToken) {
    //         const url = `http://localhost/tarabaran/public/api/tax/${theRout.rout}`;
    //         const myData = { term_id: onEdit.id, id: onEdit.id, ...addData };
    //         axios.post(url, myData, {
    //             headers: { authorization: `Bearer ${authToken}` }
    //         })
    //         .then((response) => {
    //             const data = response.data[theRout.type];
    //             fields.forEach((field) => {
    //                 const el = inputRefs.current[field.key];
    //                 if (el) {
    //                     if (field.is_binary && el instanceof HTMLInputElement) {
    //                         el.checked = !!data[field.key];
    //                     } else if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
    //                         el.value = data[field.key] || "";
    //                     }
    //                 }
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data', error);
    //         });
    //     } else {
    //         fields.forEach((field) => {
    //             const el = inputRefs.current[field.key];
    //             if (el) {
    //                 if (field.is_binary && el instanceof HTMLInputElement) {
    //                     el.checked = false;
    //                 } else if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
    //                     el.value = "";
    //                 }
    //             }
    //         });
    //     }
    // }, [onEdit, isOpen, authToken, fields, addData, theRout]);
    useEffect(() => {
        // Initialize inputs using formData directly
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
      }, [formData, isOpen, fields]);  // We depend on formData and isOpen
      
      
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

    if (!isOpen) return null;

    const flattenTerms = (terms: Term[]): Term[] => {
        return terms.flatMap(term => [term, ...(term.children ? flattenTerms(term.children) : [])]);
    };

    const flatTerms = flattenTerms(forParent);

    return (
        <div tabIndex={-1} aria-hidden="true" className="transition-all delay-75 flex bg-[#1a181885] backdrop-filter-[blur(2px)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-full">
            <div className="transition-all delay-75 relative p-4 w-full max-w-2xl max-h-full m-auto">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                        <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                                            <label htmlFor={field.key} className="block mb-2 text-sm font-medium text-neutral-800">
                                                {field.label}
                                            </label>
                                            <input
                                                type="text"
                                                id={field.key}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
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
                            onClick={onClose}
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
