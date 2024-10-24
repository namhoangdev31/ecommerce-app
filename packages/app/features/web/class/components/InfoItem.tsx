import React from 'react'

export const InfoItem: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
}> = ({ icon, label, value }) => (
  <div className="mb-2 flex items-center text-gray-300">
    <span className="mr-2">{icon}</span>
    <span className="mr-2 font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
)
