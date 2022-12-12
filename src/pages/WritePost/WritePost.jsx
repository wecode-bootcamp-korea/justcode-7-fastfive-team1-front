import React from 'react';
import css from './WritePost.module.scss';

function WritePost() {
  return (
    <div className={css.container}>
      {/**TODO: SideBar gonna be here */}

      <div className={css.totalWrap}>
        <h1>우리 회사 소개하기</h1>
        <h3>우측 *표시는 필수 작성 항목입니다.</h3>
        <h3>0000분에 자동 저장되었습니다.</h3>

        <form>
          <h2>업종 * </h2>
          <select defaultValue="default" name="category" required>
            {/*TODO: after get data, print opts using map method */}
            <option value="default" disabled>
              카테고리
            </option>
          </select>

          <select defaultValue="default" name="detail" required>
            {/*TODO: after get data, print opts using map method */}
            <option value="default" disabled>
              상세
            </option>
          </select>
          <br />

          <h2>회사 이름 * </h2>
          <input type="text" id="companyName" name="companyName" required />
          <br />

          {/*TODO:company logo && image */}
          <div className={css.companyImage}>
            <h2>회사 로고 or 대표 이미지 * </h2>
            <label htmlFor="imageUpload">파일 첨부하기</label>
            <input type="file" id="imageUpload" required />
            <h5>10mb 이하의 jpg, png 파일을 선택해주세요.</h5>
          </div>

          <div className={css.introduce}>
            <h2>회사 소개 * </h2>
            <textarea placeholder="100자 이내로 간단하게 설명해 주세요." />
          </div>
          <br />

          <h2>홈페이지</h2>
          <input
            type="text"
            id={css.companyURL}
            name="companyURL"
            placeholder="우리 회사의 홈페이지 주소를 알려주세요."
          />
          <br />

          <h2>주력 업무 분야 * </h2>
          <input
            type="text"
            id={css.field}
            name="field"
            placeholder="5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제장, 영상제작 "
          />
          {/*TODO: 특정 상황에서만 경고 문구 뜨게 */}
          <h4>주요 업무는 5개 이하로 소개해주세요.</h4>

          <div className={css.detail}>
            <h2>자세한 소개 및 업무 레퍼런스 </h2>
            <textarea placeholder="우리 회사 소개,패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요." />
          </div>

          <div className={css.detail}>
            <h2>패스트파이브 멤버 혜택 </h2>
            <textarea
              id="benefit"
              placeholder="패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요.&#13;&#10; ex)패스트파이브 멤버 컨택 시 견적의 10% 할인제공"
            />
          </div>

          {/*TODO: Depending on the grade,display or not contact information*/}
          <h2>대표 연락처 * </h2>
          <input
            type="text"
            id={css.field}
            name="field"
            placeholder="업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234 "
            required
          />

          {/*TODO:company info document attach */}
          <div className={css.companyInfo}>
            <h2>회사 소개서</h2>
            <label htmlFor="imageUpload">파일 첨부하기</label>
            <input type="file" id="imageUpload" />
            <h5>30mb 이하의 pdf, jpg, png 파일을 선택해주세요.</h5>
          </div>
          <br />

          <h2>이용 중인 지점 * </h2>
          <select defaultValue="default" name="place" required>
            {/*TODO: after get data, print opts using map method */}
            <option value="default" disabled>
              지점명
            </option>
          </select>
          <br />

          <label className={css.agree}>
            <input type="checkbox" required />
            패스트파이브 <a href="#">서비스 이용약관</a>에 동의하십니까?(필수)
          </label>

          <div className={css.btns}>
            <button>미리보기</button>
            {/*등록된 파일이 있을시 수정하기로 들어와짐 */}
            <button>등록하기</button>
            <button>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WritePost;
