export default function PageLoading() {
    return (
        <div className="h-75 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}