export default function PageError({ errorMessage }) {
    return (
        <div className="h-75 d-flex align-items-center justify-content-center">
            <h1 className="text-secondary">{errorMessage}</h1>
        </div>
    );
} 