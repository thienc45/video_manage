import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteRetreamUrl, getDetailRetreamUrl, getRestreamurl } from '../../apis/retreamurl.api'
import { Restream } from '../../types/retream.type'

type FormStateType = Omit<Restream, 'id'>

const detailRestrem: FormStateType = {
  gioBatDau: '',
  gioKetThuc: '',
  url: ''
}

export default function RestreamList() {
  const [streamList, setStreamList] = useState<Restream[]>([])
  const [currentTime, setCurrentTime] = useState('')
  const [filters, setFilters] = useState({
    scheduled: false,
    ongoing: false,
    ended: false
  })
  const [streamDetail, setStreamDetail] = useState<FormStateType>(detailRestrem)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    })
  }

  useEffect(() => {
    getRestreamurl()
      .then((res) => {
        setStreamList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching restreams:', error);
      });
  }, []);

  // so sanh time start
  useEffect(() => {
    const formattedTime = moment().format('HH:mm') // format the time as HH:MM
    setCurrentTime(formattedTime)
    const timer = setInterval(() => {
      const time = moment().format('HH:mm')
      setCurrentTime(time)
      console.log(time + 'currem  time updated')
    }, 10000) // update current time every 10 seconds
    return () => clearInterval(timer) // cleanup on unmount
  }, [])


  const getStatus = (gioBatDau: string, gioKetThuc: string) => {
    if (gioBatDau > currentTime && gioKetThuc > currentTime) {
      return 'Scheduled';
    } else if (gioKetThuc < currentTime) {
      return 'Ended';
    } else {
      return 'Ongoing';
    }
  };

  const handleDelete2 = async (id: number | string, gioBatDau: string, gioKetThuc: string) => {
    try {
      // Lấy currentTime
      const currentTime = new Date().toISOString(); // Hoặc cách khác để lấy currentTime

      // Lấy status từ hàm getStatus
      const status = getStatus(gioBatDau, gioKetThuc);
      console.log(status);

      if (status === 'Scheduled' || status === 'Ongoing') {
        // Gọi API xóa video
        await deleteRetreamUrl(id); // Giả định deleteRetreamUrl là API để xóa video
        alert('Video deleted successfully!');

        // Cập nhật danh sách stream sau khi xóa
        const response = await getRestreamurl();
        setStreamList(response.data);
      } else {
        alert('Video không thể xóa vì đã kết thúc');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const filteredStreams = streamList.filter((stream) => {
    const status = getStatus(stream.gioBatDau, stream.gioKetThuc)
    const { scheduled, ongoing, ended } = filters

    // If all filters are false, display all streams
    if (!scheduled && !ongoing && !ended) return true

    if (status === 'Scheduled' && scheduled) return true
    if (status === 'Ongoing' && ongoing) return true
    if (status === 'Ended' && ended) return true

    return false
  })

  return (
    <div className='container mx-auto'>
      <div>
        <h3 className='mb-4 font-semibold text-gray-900 dark:text-white'>Technology</h3>
        <ul className='float-start w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
          <li className='w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600'>
            <div className='flex items-center ps-3'>
              <input
                id='vue-checkbox'
                type='checkbox'
                name='scheduled'
                checked={filters.scheduled}
                onChange={handleCheckboxChange}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor='vue-checkbox'
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Sẽ diễn ra
              </label>
            </div>
          </li>
          <li className='w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600'>
            <div className='flex items-center ps-3'>
              <input
                id='react-checkbox'
                type='checkbox'
                name='ongoing'
                checked={filters.ongoing}
                onChange={handleCheckboxChange}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor='react-checkbox'
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Đang diễn ra
              </label>
            </div>
          </li>
          <li className='w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600'>
            <div className='flex items-center ps-3'>
              <input
                id='angular-checkbox'
                type='checkbox'
                name='ended'
                checked={filters.ended}
                onChange={handleCheckboxChange}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor='angular-checkbox'
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Đã diễn ra
              </label>
            </div>
          </li>
        </ul>
      </div>

      <Link
        to='/addRestream'
        type='button'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Add restream
      </Link>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Giờ bắt đầu
              </th>
              <th scope='col' className='px-6 py-3'>
                Giờ kết thúc
              </th>
              <th scope='col' className='px-6 py-3'>
                Video
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStreams.map((stream) => (
              <tr
                className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                key={stream.id}
              >
                <td className='px-6 py-4'>{stream.gioBatDau}</td>
                <td className='px-6 py-4'>{stream.gioKetThuc}</td>
                <td className='px-6 py-4'>
                  {stream.url}
                  {/* <video id={`video-${stream.id}`} className='w-1/2 video' controls>
                    <source src={'http://localhost:8081/api/restream/' + 'play/' + stream.id} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video> */}
                </td>
                <td className='px-6 py-4'>
                  {' '}
                  <td className='px-6 py-4'>{getStatus(stream.gioBatDau, stream.gioKetThuc)}</td>
                </td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => handleDelete2(stream.id, stream.gioBatDau, stream.gioKetThuc)}
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
