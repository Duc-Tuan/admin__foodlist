import { useForm } from 'react-hook-form';
import { ILogin } from '../types';
import './index.scss';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useToast } from '../../../hooks';
import { actions as actionsAccount } from '../store';
import { useNavigate } from 'react-router-dom';
import { PATHNAME } from '../../../configs/pathname';
import { Button, CheckBox, InputComp } from '../../../components';
import { useTranslation } from 'react-i18next';
import Bg from '../../../assets/images/bg_login_1.png';
import React from 'react';

type Props = {};

const Login = (props: Props) => {
  const { t } = useTranslation();
  const disptach = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: {
      password: '',
      usename: '',
    },
  });

  const onSubmit = handleSubmit(async (data: ILogin) => {
    try {
      setLoading(true);
      const res = await disptach(actionsAccount.login(data));
      const { payload } = res;
      toast(payload?.mess, payload?.status ? 'success' : 'error');
      if (payload?.status) {
        return navigate(PATHNAME.SCREENDASHBOARD);
      }
    } catch (error) {
      console.log(error);
      return toast('Đã xảy ra lỗi', 'error');
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Helmet>
        <title>{'Đăng nhập | admin'}</title>
      </Helmet>
      <div className="wrapper__login d-flex justify-content-center align-items-center w-100 h-100vh">
        <img src={Bg} alt="login" />
        <div className="form__Login d-flex justify-content-center align-items-center flex-column gap-10">
          <h2 className="title">{t('Đăng nhập')}</h2>

          <InputComp
            value={watch('usename')}
            label="Tài khoản"
            errors={errors.usename ? true : false}
            placeholder="abcd..."
            inputProps={{ ...register('usename', { required: true }) }}
          />
          <InputComp
            type="password"
            label="Mật khẩu"
            value={watch('password')}
            errors={errors.password ? true : false}
            placeholder="abcd..."
            inputProps={{ ...register('password', { required: true }) }}
          />

          <div className="d-flex justify-content-between align-items-center w-100">
            <CheckBox label="Nhớ mật khẩu." /> <div className="reset__pass">Bạn quên mật khẩu?</div>
          </div>

          <Button color={loading ? 'destroy' : 'primary'} disabled={loading} onClick={onSubmit} className="w-100 mt-10">
            {t('Đăng nhập')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
