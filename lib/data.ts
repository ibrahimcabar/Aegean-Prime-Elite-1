export type Property = {id:number;title:string;city:string;country:string;address:string;price:number;currency:'EUR';type:string;beds:number;area:number;image:string};
export const properties:Property[]=[
{id:1,title:'Bosphorus View Residence',city:'Istanbul',country:'Turkey',address:'Bebek, Istanbul',price:1250000,currency:'EUR',type:'Apartment',beds:3,area:215,image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&q=85'},
{id:2,title:'Contemporary Berlin Apartment',city:'Berlin',country:'Germany',address:'Hauptstraße, Berlin',price:495000,currency:'EUR',type:'Apartment',beds:2,area:96,image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&q=85'},
{id:3,title:'Palm Jumeirah Villa',city:'Dubai',country:'UAE',address:'Palm Jumeirah, Dubai',price:3200000,currency:'EUR',type:'Villa',beds:5,area:560,image:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1100&q=85'},
{id:4,title:'Mediterranean Retreat',city:'Antalya',country:'Turkey',address:'Konyaaltı, Antalya',price:890000,currency:'EUR',type:'Villa',beds:4,area:320,image:'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1100&q=85'},
];
export const packages=[{name:'Starter',count:5,price:39},{name:'Professional',count:10,price:69},{name:'Business',count:20,price:119}];
