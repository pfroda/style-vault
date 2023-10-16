import './colorfilter.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryColors } from '@/app/services/apiGraphQL';
import useAuth from '@/app/hooks/useAuth';

function ColorFilter() {
    const selectedColors = useSelector((state) => state.filter.color) || [];
    const [colors, setColors] = useState<string[]>([]);
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const res = await queryColors(user?.id!);
                console.log('graph colors:', res);
                setColors(res.data?.getColors || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchColors();
    }, [user?.id]);

    const handleSelectedColor = async (color) => {
        let updatedColors;

        if (selectedColors.includes(color)) {
            updatedColors = selectedColors.filter((selected) => selected !== color)
        } else {
            updatedColors = [...selectedColors, color]
        }
        console.log('updatedColors', updatedColors);
        dispatch(setSelectedFilter({ type: 'color', value: updatedColors }))
    };

    return (
        <div className="ColorFilter">
            <h4>Color</h4>
            <div className="filter-tags">
                <ul className="filter-tags-list">
                    {colors.map((color, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectedColor(color)}
                            className={selectedColors.includes(color) ? 'selected' : '' }
                        >
                            <span className={`colorDot ${color.toLowerCase()}`} style={{ backgroundColor: color }}></span>
                            {color}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ColorFilter;
