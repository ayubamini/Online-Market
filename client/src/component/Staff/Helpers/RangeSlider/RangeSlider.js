import React from 'react'
import { Range, getTrackBackground } from 'react-range'


const TwoThumbs = ({STEP=1, MIN =0, MAX = 100, values=[0,0], setValues, dp=0, color='var(--custom-color-primary)'}) => {

    return (
        <div className='d-flex justify-content-center flex-wrap'>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValues(values);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        className='d-flex w-100'
                        style={{
                            ...props.style,
                            height: '36px',
                        }}
                    >
                        <div
                            ref={props.ref}
                            className='w-100 rounded align-self-center'
                            style={{
                                height: '5px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#ccc', color, '#ccc'],
                                    min: MIN,
                                    max: MAX
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ index, props }) => (
                    <div className='rounded bg-white d-flex justify-content-center align-items-center'
                        {...props}
                        style={{
                            ...props.style,
                            height: '15px',
                            width: '15px',
                            boxShadow: '0px 2px 6px #AAA'
                        }}
                    >
                        <div className='position-absolute fw-bold text-white p-1 rounded'
                            style={{
                                top: '-28px',
                                fontSize: '14px',
                                backgroundColor: color
                            }}
                        >
                            {values[index].toFixed(dp)}
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default TwoThumbs;