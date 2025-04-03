import React from 'react';
import { Button } from '../ui/Button';

export function AuditorCard({ name, companyname, description, imageUrl,isSelected,onViewProfile,btnLabel="View Profile",contactperson }) {
    return (
       
            <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-3">
                    <img
                        src={imageUrl || `https://ui-avatars.com/api/?name=${contactperson}`}
                        alt={name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="font-inter font-medium text-base leading-6">{contactperson}</h3>
                    </div>
                </div>
                <p className="font-inter font-semibold text-base leading-[24px] mb-2">{companyname}</p>
                <p className="font-inter font-normal text-sm leading-5 text-[#525866] mb-4">{description}</p>
                <div className="mt-auto">
                    <Button 
                    variant="primary" 
                    className="w-full" 
                    disabled={!isSelected}
                    onClick={onViewProfile}
                    >{btnLabel}</Button>
                </div>
            </div>
       

    );
}