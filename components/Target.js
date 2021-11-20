
export default function Target(){


    return (
        <div style= {{
            background: "transparent", 
            position: "fixed", 
            top: '50%', 
            left: '50%', 
            width: "64px",
            height: "64px",
            borderRadius: 32,
            border: '2px solid black',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.25
        }}    
        >
            <div
            style={{
                width: '4px',
                height: '4px',
                borderRadius: 4,
                background: "black"
            }}>
 
            </div>
  
        </div>
    )
}
