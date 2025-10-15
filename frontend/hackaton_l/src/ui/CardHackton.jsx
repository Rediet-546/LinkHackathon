
import React from 'react';
import { Card, CardContent } from './Card';
import { Link } from 'react-router-dom';
const CardHackton = ({ 
  id,
  banner, 
  title, 
  description, 
  company, 
  startDate, 
  endDate, 
  actionButton, 
  isApplied 
}) => {
  console.log(`title is ${title}` + isApplied)
  return (
    <Card className="group overflow-hidden border-1 border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Banner */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={banner}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {title}
        
        </h3>
         {isApplied &&  <h1>you are already applied</h1>}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description}
        </p>

        <div className="text-xs text-muted-foreground mb-1">
          <span className="font-medium text-gray-800">Company:</span> {company?.fullName || 'N/A'}
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>Start: {new Date(startDate).toLocaleDateString()}</span>
          <span>End: {new Date(endDate).toLocaleDateString()}</span>
        </div>

        {/* Action Button or Applied Indicator */}
        {isApplied ? (
         <Link to = {`/hackton/${id}`}>
          <div className="text-center text-gray-500 font-medium py-2">
            You already applied
          </div>
         </Link>
        ) : (
          actionButton && (
            <button
              onClick={actionButton.onClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              {actionButton.label}
            </button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default CardHackton;
