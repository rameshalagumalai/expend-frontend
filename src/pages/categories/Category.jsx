export default function Category({ category }) {
    return (
        <div className="col-6 p-1">
            <div className="border border-2 rounded-3 p-4 text-center cursor-pointer">
                <i style={{color: category.colorCode}} className="fas fa-circle fa-2x"></i>
                <h6 className="f-500 mt-2 mb-0">{ category.name }</h6>
            </div>
        </div>
    );
}