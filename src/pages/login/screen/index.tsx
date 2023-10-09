import { useForm } from 'react-hook-form';
import { ILogin } from '../types';
import './index.scss';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useToast } from '../../../hooks';
import { actions as actionsAccount } from '../store';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../configs/pathname';

type Props = {};

const Login = (props: Props) => {
  const disptach = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = handleSubmit(async (data: ILogin) => {
    try {
      const res = await disptach(actionsAccount.login(data));
      const { payload } = res;
      toast(payload?.mess, payload?.status ? 'success' : 'error');
      if (payload?.status) {
        return navigate(PATHNAME.SCREENDASHBOARD);
      }
    } catch (error) {
      console.log(error);
      return toast('Đã xảy ra lỗi', 'error');
    }
  });

  return (
    <>
      <Helmet>
        <title>{'Đăng nhập | admin'}</title>
      </Helmet>
      <div className="form__Login">
        <label>First Name</label>
        <input {...register('usename', { required: true })} />
        {errors.usename && <span>This field is required</span>}
        <label>Last Name</label>
        <input {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
        <br />
        <button type="button" onClick={onSubmit}>
          SetValue
        </button>
      </div>
    </>
  );
};

export default Login;
