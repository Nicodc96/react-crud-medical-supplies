import loading from '../assets/loading.gif';

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center pt-5 pb-5">
            <img src={loading} alt="loading" />
        </div>
    )
}