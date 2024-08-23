import "../index.css"
export default function Noteitem(props) {
          const{ id , tag , title , description ,date, update , deleteone} = props;
  return (
          <div className="mb-4 noteitem p-2">
          <span className="badge text-bg-info m-2">{tag}</span>
            <h3 className='mt-3 text-dark text-center title'>{title.toUpperCase()}</h3>
            {tag.toLowerCase()==="link"?<a target='_main' href={description} className='des'>{description}</a>:<p className='des'>{description}</p>}
            <time className="text-dark">{date.slice(0,10)}</time>
            <div className="btns d-flex justify-content-between align-items-center p-2">
                    <button className='btn btn-primary' onClick={()=>{update(id ,tag , title , description)}}>
                    <i className="fa-solid fa-pen-to-square m-1"></i>Edit</button>
                    <button className='btn btn-danger' onClick={()=>{deleteone(id)}}>
                    <i className="fa-solid fa-trash m-1"></i>Delete</button>
            </div>
                </div>
  )
}
