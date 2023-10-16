import './brandsfilter.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryBrands } from "@/app/services/apiGraphQL";
import useAuth from '@/app/hooks/useAuth';

function BrandsFilter() {
    const selectedBrands = useSelector((state) => state.filter.brand);
    const [brands, setBrands] = useState<string[]>([]);
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await queryBrands(user?.id!);
                console.log('graphql brands:', res);
                setBrands(res.data?.getBrands || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBrands();
    }, [user?.id, selectedBrands]);

    // useEffect(() => {
    //     // Dispatch action when select brands chnge
    //     console.log('selected brands', selectedBrands);

    //     dispatch(setSelectedFilter({ type: 'brand', value: selectedBrands }));
    // }, [selectedBrands]);

    const handleSelectedBrand = async (brand) => {
        let updatedBrands;

        if (selectedBrands.includes(brand)) {
            updatedBrands = selectedBrands.filter((selected) => selected !== brand)
        } else {
            updatedBrands = [...selectedBrands, brand]
        }
        console.log('updatedBrands', updatedBrands);
        dispatch(setSelectedFilter({type: 'brand', value: updatedBrands}))
    };

    return (
        <div className="BrandsFilter">
            <h4>Brand</h4>
            <div className="filter-tags">
                <ul className="filter-tags-list">
                    {brands.map((brand, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectedBrand(brand)}
                            className={selectedBrands.includes(brand) ? 'selected' : ''}
                        >
                            {brand}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BrandsFilter;
