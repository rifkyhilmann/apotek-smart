import React from "react";
import { Field, ErrorMessage } from "formik";

interface Props {
  title: string;
  name: string;
  type: string;
  options?: { id: string; name: string }[]; // Opsional, hanya dibutuhkan untuk select
}

const InputFormik: React.FC<Props> = ({ title, name, type, options }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">{title}</span>

            {/* Logika untuk memilih tipe field */}
            {type === "select" && options ? (
                // Jika tipe adalah select, tampilkan Field sebagai select
                <Field as="select" name={name} className="select flex gap-1 border h-8 rounded items-center px-2 font-poppins text-xs">
                    <option value="">Pilih {title}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                        {option.name}
                        </option>
                    ))}
                </Field>
            ) : (
                // Jika bukan select, tampilkan Field sebagai input
                <Field
                    name={name}
                    type={type === "date" ? "date" : type} // Pastikan tipe adalah date jika type diberikan
                    className="w-full h-8 rounded indent-3 focus:outline-none border text-xs"
                    min={type === "date" ? today : undefined}
                />
            )}

            {/* Pesan Error */}
            <ErrorMessage name={name}>
                {(msg) => <div className="text-red-500 text-[9px]">{msg}</div>}
            </ErrorMessage>
        </div>
  );
};

export default InputFormik;
