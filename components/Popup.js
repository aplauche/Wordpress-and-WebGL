
export default function Popup({info}){


    return (
        <div style={{
            background: "white", 
            color: "black", 
            position: "fixed", 
            top: '50%', 
            left: '50%', 
            width: "90%",
            maxWidth: 800,
            padding: 32,
            borderRadius: 16,
            boxShadow: '2px 2px 20px rgba(0,0,0,0.2)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 32,
            alignItems: 'center',
            zIndex: 100}}
            onClick={(e)=> e.stopPropagation()}
            
        >
            <img src={info.url} 
                style={{
                    width: '50%',
                    height: 'auto'
                }}
            />
            <div
            style={{
                width: '50%',
                height: 'auto'
            }}>
                <h1>{info.title}</h1>
                <p>{info.content}</p>
            </div>
  
        </div>
    )
}

