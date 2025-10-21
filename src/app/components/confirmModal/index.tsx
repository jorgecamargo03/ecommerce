'use client'
import React, { useEffect, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'


type Props = {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmModal = ({ open, onClose, onConfirm }: Props) => {

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (open) {
            setVisible(true)
        } else {
            const timeOut = setTimeout(() => { setVisible(false) }, 200)
            return () => clearTimeout(timeOut)
        }

    }, [open])
    if (!open && !visible) return null


    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[100] transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'
                }`}
        >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}></div>
        <div
        className={`relative bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center z-[101]
        transform transition-all duration-200 ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mb-3" />
          <h2 className="text-xl font-bold mb-2">Tem certeza?</h2>
          <p className="text-zinc-600 mb-6">
            Você quer excluir os produtos selecionados?
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Sim, excluir
          </button>
          <button
            onClick={onClose}
            className="bg-zinc-300 text-zinc-800 px-5 py-2 rounded-lg hover:bg-zinc-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>

        </div>
    )
}

export default ConfirmModal
